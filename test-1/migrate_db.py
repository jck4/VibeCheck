from app import app, db, User

def migrate_database():
    with app.app_context():
        # Add is_admin column if it doesn't exist
        try:
            # Check if the column exists
            db.session.execute("SELECT is_admin FROM user LIMIT 1")
        except Exception:
            # Column doesn't exist, add it
            db.session.execute("ALTER TABLE user ADD COLUMN is_admin BOOLEAN DEFAULT FALSE")
            db.session.commit()
            print("Added is_admin column to user table")

        # Set default admin user
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@example.com',
                is_admin=True
            )
            admin.set_password('admin')  # Change this password in production!
            db.session.add(admin)
            db.session.commit()
            print("Created default admin user")

if __name__ == '__main__':
    migrate_database() 