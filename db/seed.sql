use employees;

INSERT INTO department
    (name)
VALUES
    ('Arts'),
    ('Sciences'),
    ('Business'),
    ('Law');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Arts Professor', 80000, 1),
    ('Acting Assistant', 40000, 1),
    ('Sciences Professor', 150000, 2),
    ('Engineering Aide', 60000, 2),
    ('Business Professor', 140000, 3),
    ('Accounting Assistant', 65000, 3),
    ('Law Professor', 200000, 4),
    ('Legal Aide', 70000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jessica', 'Rabbit', 1, NULL),
    ('Adam', 'Sandler', 2, 1),
    ('Bill', 'Nye', 3, NULL),
    ('Neil', 'DeGrasse Tyson', 4, 3),
    ('Jeff', 'Bezos', 5, NULL),
    ('Mark', 'Cuban', 6, 5),
    ('Elle', 'Woods', 7, NULL),
    ('Ruth', 'Ginsburg', 8, 7);
