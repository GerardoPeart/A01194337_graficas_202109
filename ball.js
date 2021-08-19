class ball
{
    constructor(x, y, radio, color)
    {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
    }

    draw(contexto)
    {
        contexto.fillStyle = this.color;
        contexto.beginPath();
        contexto.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        contexto.fill();
    }

    update()
    {

    }
}

export { ball };