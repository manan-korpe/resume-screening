export function buildQuery(req, options = {}) {
  const {
    searchableFields = [],
    sortableFields = ["id"],
    defaultSort = "id",
    defaultOrder = "ASC",
  } = options;

  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 10, 1);
  const search = req.query.search || "";

  const sortBy = sortableFields.includes(req.query.sortBy)
    ? req.query.sortBy
    : defaultSort;

  const order =
    req.query.order?.toUpperCase() === "DESC"
      ? "DESC"
      : defaultOrder;

  const values = [];
  const where = [];

  // Remove reserved query params
  const reserved = ["page", "limit", "search", "sortBy", "order"];

  Object.entries(req.query).forEach(([key, value]) => {
    if (!reserved.includes(key) && value !== "") {
      values.push(value);
      where.push(`${key} = $${values.length}`);
    }
  });

  if (search && searchableFields.length) {
    const conditions = searchableFields.map((field) => {
      values.push(`%${search}%`);
      return `${field} ILIKE $${values.length}`;
    });

    where.push(`(${conditions.join(" OR ")})`);
  }

  const whereClause =
    where.length > 0
      ? `WHERE ${where.join(" AND ")}`
      : "";

  values.push(limit);
  values.push((page - 1) * limit);

  return {
    whereClause,
    orderClause: `ORDER BY ${sortBy} ${order}`,
    paginationClause: `LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values,
    page,
    limit,
  };
}