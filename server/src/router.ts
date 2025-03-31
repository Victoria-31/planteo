import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import plantAction from "./modules/plant/plantAction";

router.get("/api/plants", plantAction.browse);
router.get("/api/plants/:id", plantAction.read);

/* ************************************************************************* */

export default router;
