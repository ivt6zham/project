from flask import Flask
from .api.health_check import bp as health_check
from .api.auth import bp as auth
from .db.db import init_db
from flask_cors import CORS
from app.api.locations import bp as locations_bp
from app.api.sensors import bp as sensors_bp
from app.api.measurements import bp as measurements_bp


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    with app.app_context():
        init_db()

    app.register_blueprint(health_check, url_prefix="/api")
    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(sensors_bp, url_prefix="/api/sensors")
    app.register_blueprint(locations_bp, url_prefix="/api/locations")
    app.register_blueprint(measurements_bp, url_prefix="/api/measurements")

    return app