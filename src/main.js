import "./style.css";

import { IntroScene } from "./scenes/IntroScene";
import { EarthScene } from "./scenes/EarthScene";

const intro = new IntroScene();

intro.onFinish = () => {

    intro.dispose();

    const earth = new EarthScene();

    earth.start();

};

intro.start();


// import "./style.css";
// import { IntroScene } from "./scenes/IntroScene";
// import { EarthScene } from "./scenes/EarthScene";

// const intro = new IntroScene();

// intro.start(() => {

//     intro.dispose();

//     const earth = new EarthScene();

//     earth.start();

// });