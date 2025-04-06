// @ts-nocheck
import './hover.glow.css';

const HoverGlowButton = ({ text }) => {

    return (
        <button className="glow-on-hover" type="button">{text}</button>
    )
}

export default HoverGlowButton;
