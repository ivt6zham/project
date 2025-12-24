from app.db.db import get_db


def measurement_ts_by_sensor(sensor_id):
    database = get_db()
    cur = database.execute(
        "SELECT ts FROM readings WHERE sensor_id = ?",
        (sensor_id,),
    )
    res = cur.fetchall()
    return [row["ts"] for row in res]


def measurement_by_sensor_interval(sensor_id, ts_from, ts_to):
    database = get_db()
    cur = database.execute(
        """
        SELECT *
        FROM readings
        WHERE sensor_id = ?
          AND ts BETWEEN ? AND ?
        ORDER BY ts ASC
        """,
        (sensor_id, ts_from, ts_to),
    )
    res = cur.fetchall()
    return [dict(row) for row in res]