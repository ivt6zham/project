from flask import Blueprint, jsonify, request
from app.db.measurements import measurement_ts_by_sensor, measurement_by_sensor_interval

bp = Blueprint("measurements", __name__, url_prefix="/measurements")


@bp.get("/<int:sensor_id>/timestamps")
def get_measurement_timestamps(sensor_id):
    data = measurement_ts_by_sensor(sensor_id)
    return jsonify({"data": data}), 200
@bp.get("/<int:sensor_id>")
def get_measurements_by_interval(sensor_id):
    ts_from = request.args.get("from")
    ts_to = request.args.get("to")

    if not ts_from or not ts_to:
        return jsonify({"error": "from and to are required"}), 400

    data = measurement_by_sensor_interval(sensor_id, ts_from, ts_to)
    return jsonify({"data": data}), 200
