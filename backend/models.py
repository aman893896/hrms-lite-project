from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Employee(db.Model):
    __tablename__ = 'employee'

    id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    department = db.Column(db.String(100), nullable=False)

    # Relationship with Attendance
    attendance = db.relationship(
        'Attendance',
        backref='employee',
        lazy=True,
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Employee {self.emp_id} - {self.name}>"


class Attendance(db.Model):
    __tablename__ = 'attendance'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False)

    emp_db_id = db.Column(
        db.Integer,
        db.ForeignKey('employee.id'),
        nullable=False
    )

    def __repr__(self):
        return f"<Attendance {self.emp_db_id} - {self.date} - {self.status}>"
