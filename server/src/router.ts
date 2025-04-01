import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import plantAction from "./modules/plant/plantAction";
import plantUserAction from "./modules/plantUser/plantUserAction";

router.get("/api/plants", plantAction.browse);
router.get("/api/plants/:id", plantAction.read);

// user plant
router.get("/api/userplants", plantUserAction.browse);
router.post("/api/userplants", plantUserAction.add);
router.delete("/api/userplants/:id", plantUserAction.destroy);
/* ************************************************************************* */

export default router;
