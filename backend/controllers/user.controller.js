import asyncHandler from "../utils/asyncHandler.js";
import ResponseHalper from "../utils/responseHalper.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenHalper.js";
import { query } from "../config/db.js";
import { buildQuery } from "../utils/queryBuilder.js";

const option = {
    httpOnly: true,
    secure: true,
    sameSite: "none"
};

const register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const isExists = await query("select * from users where email=$1", [email]);

    if (isExists.rows[0]) {
        ResponseHalper.error(res, "Email already exists", 400)
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await query(
        "insert into users (name,email,password,role) values ($1,$2,$3,$4)",
        [name, email, hashPassword, role]
    );

    if (result.rowCount == 0) {
        ResponseHalper.error(res, "User registrstion failed", 400);
    }

    return ResponseHalper.success(res, "User registered successfully. ", { name, email, role }, 201);
});

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    let user = await query("select * from users where email = $1", [email]);
    user = user.rows[0];

    if (!user) {
        ResponseHalper.error(res, "Invalid email or password", 401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        ResponseHalper.error(res, "Invalid email or password", 401)
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option);

    await query("update users set accesstoken=$1,refreshtoken=$2 where id=$3", [accessToken, refreshToken, user.id]);

    return ResponseHalper.success(
        res,
        "Login successful.",
        { id: user.id, name: user.name, email: user.email, role: user.role },
        201
    );
});

const logout = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    res
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option);

    await query("update users set accesstoken=$1, refreshtoken=$2 where id=$3", [null, null, id]);

    return ResponseHalper.success(
        res,
        "Logout successful.",
        {},
        200
    );
});

const resetPassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, password } = req.body;

    const isValidPassword = await bcrypt.compare(oldPassword, req.user?.password);
    if (!isValidPassword) {
        ResponseHalper.error(res, "Invalid old password.", 400);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await query("update users set password=$1 where id=$2", [hashPassword, req.user?.id]);

    if (user.rowCount === 0) {
        ResponseHalper.error(res, "Forget password failed.");
    }

    return ResponseHalper.success(res, "Password successfuly set.", {}, 201);
});

const forgetPassword = asyncHandler(async (req, res, next) => {

});

const me = asyncHandler(async (req, res, next) => {
    const { id, name, email, role, create_at } = req.user;
    ResponseHalper.success(res, "User Found.", { id, name, email, role, create_at }, 200);
});

const refreshAccessToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
        ResponseHalper.error(res, "Access denied.", 401);
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    let user = await query(
        "select * from users where id=$1",
        [decodedToken?.id]
    );

    user = user.rows[0];

    if (!user) {
        ResponseHalper.error(res, "User not found.", 401);
    }

    if (user.refreshtoken !== token) {
        ResponseHalper.error(res, "Access denied.", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };

    res
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option);

    return ResponseHalper.success(res, "Refreshed token refreshed.", {}, 201)
});

const users = asyncHandler(async (req, res, next) => {
    const {
        page,
        limit,
        search,
        sortBy,
        order,
        role,
    } = req.query;

    const qu = buildQuery(req, {
        searchableFields: ["name", "email"],
        sortableFields: ["id", "name"],
    });


    const sql = `
      SELECT *
      FROM users
      ${qu.whereClause}
      ${qu.orderClause}
      ${qu.paginationClause}
  `;
    const user = await query(sql, qu.values);

    const filterValues = qu.values.slice(0, -2);
    const countResult= await query(`SELECT count(*)
      FROM users
      ${qu.whereClause}`,filterValues);
    const total = Number(countResult.rows[0].count);
    return ResponseHalper.success(res, {
        data:user.rows,
        page,
        limit,
        total,
        totalPages:Math.ceil(total/limit)
    }, 200);
});

const singleUser = asyncHandler(async (req, res, next) => {
    const id = req.params?.id;

    let user = await query("select id,name,email,role from users where id=$1", [id]);

    if (!user) {
        ResponseHalper.error(res, "User not found.", 401);
    }

    return ResponseHalper.success(res, "User found.", user.rows[0], 201);
});

export {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    me,
    refreshAccessToken,
    users,
    singleUser
};