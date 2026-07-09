create table users (
id int generated always as identity primary key,
name varchar(20) not null,
email varchar(40) unique,
password varchar(20) not null,
role int default 0,
create_at timestamptz default current_timestamp
);

create table jobs (
id int generated always as identity primary key,
title varchar(30),
description varchar(100),
required_skills jsonb default '[]'::jsonb,
minimum_score numeric(5,2) default 0.0,
create_at timestamptz default current_timestamp
)
-- alter table jobs add column id int primary key;

create table candidates (
id int generated always as identity primary key,
name varchar(20) not null,
emial varchar(40) not null,
phone varchar(10) not null,
resume_url text not null,
resume_text text,
experience numeric(3,1) default 0.0
);

create table analysis (
id int generated always as identity primary key,
candidate_id int,
job_id int,
score numeric(4,2) not null,
matched_skills jsonb default '[]'::jsonb,
missing_skills jsonb default '[]'::jsonb,
recommendation boolean default False,
strengths jsonb default '[]'::jsonb,
weaknesses jsonb default '[]'::jsonb,
foreign key (candidate_id) references candidates(id),
foreign key (job_id) references jobs(id)
);
