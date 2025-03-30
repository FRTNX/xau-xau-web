import './hover.glow.css';

const HoverGlowButton = ({ text}) => {

    return (
        <button class="glow-on-hover" type="button">{text}</button>
    )
}

export default HoverGlowButton;
