import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import earthAction from "./modules/earth/earthAction";
import plantAction from "./modules/plant/plantAction";
import plantUserAction from "./modules/plantUser/plantUserAction";

router.get("/api/plants", plantAction.browse);
router.get("/api/plants/:id", plantAction.read);
router.get("/api/plants-search", plantAction.browseByCategory);

// user plant
router.get("/api/userplants", plantUserAction.browse);
router.post("/api/userplants", plantUserAction.add);
router.delete("/api/userplants/:id", plantUserAction.destroy);

//earth

router.get("/api/earth", earthAction.browse);

/* ************************************************************************* */

export default router;
