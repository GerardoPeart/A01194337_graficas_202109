class ball
{
    constructor(x, y, radio, color,state,direction,minY,maxY,maxW)
    {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.state = state;
        this.direction = direction;
        this.minY =minY;
        this.maxY = maxY;
        this.maxW = maxW;

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

        switch(this.state){
            case 1: // derecha, abajo
            this.x += 5;
            this.y += 5;
                break;
            case 2: // derecha, arriba
            this.x += 5;
            this.y -= 5;
                break;
            case 3: // izquierda, abajo
            this.x -= 5;
            this.y += 5;
                break;
            case 4: // izquierda, arriba
            this.x -= 5;
            this.y -= 5;
                break;
        }

        if(this.direction === 1){
            if(this.y > this.maxY) this.state=2;   
                else if(this.y <= this.minY ) this.state=1;
            }else if(this.direction === 2){
            if(this.y > this.maxY) this.state=4;   
                else if(this.y <= this.minY ) this.state=3;      

            }

        if(this.x > this.maxW ){
            if(this.state == 1) this.state=3;
            else if(this.state == 2) this.state=4;
            this.direction = 2;
        }else if(this.x <= 0){
            if(this.state == 3) this.state=1;
            else if(this.state == 4) this.state=2;
            this.direction = 1;
        }

           
            

    }
}

export { ball };
