import express from "express";
import pool from "../config/db.js";
import { protect } from "../Middleware/auth.js";

const router = express.Router();

// ADMIN - Update shipment status
router.patch("/:id/status", protect, async (req, res) => {
  try {
    // only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }

    const updated = await pool.query(
      `UPDATE shipments
       SET current_status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id],
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADMIN - View all shipments
router.get("/", protect, async (req, res) => {
  try {
    // Only admins allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const shipments = await pool.query(
      "SELECT * FROM shipments ORDER BY created_at DESC",
    );

    res.json(shipments.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/shipments
 * Create a shipment (logged in users only)
 */
router.post("/", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      recipient_name,
      recipient_address,
      recipient_phone,
      package_type,
      weight_kg,
      length_cm,
      width_cm,
      height_cm,
      declared_value,
    } = req.body;

    // basic validation
    if (!recipient_name || !recipient_address) {
      return res
        .status(400)
        .json({ message: "recipient_name and recipient_address are required" });
    }

    // simple tracking number generator
    const trackingNumber = "TRK-" + Date.now();

    const result = await pool.query(
      `INSERT INTO shipments
      (user_id, tracking_number, recipient_name, recipient_address, recipient_phone, package_type, weight_kg, length_cm, width_cm, height_cm, declared_value)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        userId,
        trackingNumber,
        recipient_name,
        recipient_address,
        recipient_phone || null,
        package_type || null,
        weight_kg || null,
        length_cm || null,
        width_cm || null,
        height_cm || null,
        declared_value || null,
      ],
    );

    return res.status(201).json({ shipment: result.rows[0] });
  } catch (error) {
    console.error("Create shipment error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/shipments/my
 * Dashboard: get shipments of logged-in user
 */
router.get("/my", protect, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM shipments WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );

    return res.json({ shipments: result.rows });
  } catch (error) {
    console.error("Get my shipments error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/shipments/track/:trackingNumber
 * Public tracking (no login needed)
 */
router.get("/track/:trackingNumber", async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    const result = await pool.query(
      "SELECT tracking_number, current_status, created_at FROM shipments WHERE tracking_number = $1",
      [trackingNumber],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tracking number not found" });
    }

    return res.json({ tracking: result.rows[0] });
  } catch (error) {
    console.error("Track shipment error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
