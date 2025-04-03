import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import authAction from "./middlewares/authAction";
import formPlant from "./middlewares/formPlant";
import earthAction from "./modules/earth/earthAction";
import plantAction from "./modules/plant/plantAction";
import plantUserAction from "./modules/plantUser/plantUserAction";

/* LOGIN ************************************************************************* */

router.post("/api/login", authAction.login);

//plant

router.get("/api/plants", plantAction.browse);
router.get("/api/plants/:id", plantAction.read);
router.get("/api/plants-search", plantAction.browseByCategory);
router.put("/api/plants/:id", formPlant.validate, plantAction.edit);

// user plant
router.get("/api/userplants", plantUserAction.browse);
router.post("/api/userplants", plantUserAction.add);
router.delete("/api/userplants/:id", plantUserAction.destroy);

//earth

router.get("/api/earth", earthAction.browse);

/* ************************************************************************* */

export default router;
