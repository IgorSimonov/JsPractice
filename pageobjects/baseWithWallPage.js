import BaseWithSideBarMenuPage from "./baseWithSideBarMenuPage.js";
import Wall from "./elements/wall.js";

class BaseWithWallPage extends BaseWithSideBarMenuPage {
    wall = new Wall()

    constructor(name) {
        super(name);
    }
}

export default BaseWithWallPage;