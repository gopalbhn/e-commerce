import { Lottie } from "lottie-react";
import logoAnimation from "../../assets/easymart-logo.json";

function HeroLottie() {
    return (
        <Lottie
            src={logoAnimation}
            loop
            autoplay
            style={{ width: 150, height: 50 }}
        />

    );
}

export default HeroLottie;
