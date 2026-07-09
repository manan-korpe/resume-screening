
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@company.com', 'adminPass123', 1),
('HR Manager', 'hr.manager@company.com', 'hrSecure456', 0),
('Interviewer', 'interviewer@company.com', 'interView789', 0);

INSERT INTO jobs (title, description, required_skills, minimum_score) VALUES
('Node.js Developer', 'Responsible for managing backend APIs and data layers.', '["Node.js", "Express", "PostgreSQL", "JavaScript"]'::jsonb, 75.00),
('React Frontend Engineer', 'Build modern responsive user interfaces using React.', '["React", "JavaScript", "CSS", "TypeScript"]'::jsonb, 80.00),
('DevOps Engineer', 'Manage cloud infrastructure and CI/CD pipelines.', '["Docker", "AWS", "Linux", "Kubernetes"]'::jsonb, 70.00);

INSERT INTO candidates (name, emial, phone, resume_url, resume_text, experience) VALUES
('John Doe', 'johndoe@email.com', '1234567890', 'https://storage.com/resumes/johndoe.pdf', 'Experienced backend engineer specialized in building scalable APIs with Node.js and SQL.', 4.5),
('Jane Smith', 'janesmith@email.com', '0987654321', 'https://storage.com/resumes/janesmith.pdf', 'Frontend developer focused on React ecosystem and writing clean components.', 3.2),
('Alex Jones', 'alexj@email.com', '5551234567', 'https://storage.com/resumes/alexj.pdf', 'Full stack newcomer with a strong foundation in modern JavaScript frameworks.', 1.0);

INSERT INTO analysis (candidate_id, job_id, score, matched_skills, missing_skills, recommendation, strengths, weaknesses) VALUES
(1, 1, 88.50, -- John Doe (1) for Node.js Developer (1)
 '["Node.js", "Express", "JavaScript"]'::jsonb, 
 '["PostgreSQL"]'::jsonb, 
 TRUE, 
 '["Strong backend logic foundations"]'::jsonb, 
 '["Basic relational database knowledge missing deep indexing setup"]'::jsonb),

(2, 2, 92.00, -- Jane Smith (2) for React Frontend Engineer (2)
 '["React", "JavaScript", "CSS"]'::jsonb, 
 '["TypeScript"]'::jsonb, 
 TRUE, 
 '["Excellent UI development experience"]'::jsonb, 
 '["Needs to catch up on strict static typing setups"]'::jsonb),

(3, 1, 55.00, -- Alex Jones (3) for Node.js Developer (1)
 '["JavaScript"]'::jsonb, 
 '["Node.js", "Express", "PostgreSQL"]'::jsonb, 
 FALSE, 
 '["Enthusiastic and ready to learn fast"]'::jsonb, 
 '["Lacks professional backend project exposure"]'::jsonb);

select* from analysis;