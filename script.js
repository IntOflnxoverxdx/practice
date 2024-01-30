const controls = {
    "left":"ArrowLeft",
    "right":"ArrowRight",
    "attack":"KeyX",
    "leave":"Escape"
}

function randomElement(array){
    return array[Math.floor(Math.random()*array.length)];
}

let audioPool = [];
function playSound(sound) {
    sounds = {
        "hit":[new Audio('sounds/h1.wav'),new Audio('sounds/h2.wav'),new Audio('sounds/h3.wav')],
        "death_skeleton":[new Audio('sounds/death_skeleton.wav')],
        "gameover":[new Audio("sounds/gameover.mp3")]
    }
    
    let audio = randomElement(sounds[sound]);
    audioPool.push(audio);

    let soundCountMap = {};

    audioPool.forEach(function(s) {
        let audioKey = audio.src;
      
        if (!soundCountMap[audioKey]) {
          soundCountMap[audioKey] = { count: 1, volume: 1 };
        } else {
          soundCountMap[audioKey].count++;
          soundCountMap[audioKey].volume = 1 / soundCountMap[audioKey].count;
        }
      
        s.volume = soundCountMap[audioKey].volume;
      });
    
    console.log(soundCountMap);
    

    audio.addEventListener('ended', function() {
        audioPool.splice(audioPool.indexOf(audio), 1);
    });

    audio.play();
}

    


let kills = 0;
const counterP = document.querySelector("#counter");
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function checkCollision(box1, box2) {
    let xOverlap = Math.abs(box1[1][0] - box2[0][0]) < (box1[1][2] + box2[0][2]) / 2;
    let yOverlap = Math.abs(box1[1][1] - box2[0][1]) < (box1[1][3] + box2[0][3]) / 2;

    return xOverlap && yOverlap;
}

class Player {
    constructor() {
        this.attacking = false;
        this.tog_anim = 0;
        this.tog = 1;
        this.dead = false;
        this.x = 190;
        this.y = 740;
        this.heal = 0.6;
        this.size = 5;
        this.width = 40 * this.size;
        this.height = 52 * this.size;
        this.damage = 30;
        this.maxHealth = 500;
        this.health = this.maxHealth;
        this.totally_dead = false;
        this.can_attack = true;
        this.hitbox = [40,52,0,0];
        this.attack_hitbox = [0,0,0,0];
        this.last_attack = 2;
        this.idle = [];
        this.idleSpeed = 7;
        this.animationSpeed = this.idleSpeed;
        this.animation = this.idle;
        for (let i = 0; i < 8; i++) {
            this.idle.push(Object.assign(new Image(), { src: `sprites/hero/idle/${i + 1}.png`, width: 37 * this.size, height: 52 * this.size }));
        }
        this.run = [];
        this.run_back = [];
        this.runSpeed = 13;
        for (let i = 0; i < 8; i++) {
            this.run.push(Object.assign(new Image(), { src: `sprites/hero/run/${i + 1}.png`, width: 46 * this.size, height: 52 * this.size }));
            this.run_back.push(Object.assign(new Image(), { src: `sprites/hero/run/${8 - i}.png`, width: 46 * this.size, height: 52 * this.size }));
        }
        //this.run_back = this.run;
        this.attack1 = [];
        this.attack2 = [];
        this.attackSpeed = 10;
        for (let i = 0; i < 5; i++) {
            this.attack1.push(Object.assign(new Image(), { src: `sprites/hero/attack_1/${i + 1}.png`, width: 108 *(4/3) * this.size, height: 68 * this.size }));
        }
        for (let i = 0; i < 3; i++) {        
            this.attack2.push(Object.assign(new Image(), { src: `sprites/hero/attack_2/${i + 1}.png`, width: 108 *(4/3) * this.size, height: 68 * this.size }));
        }
        this.death = [];
        this.deathSpeed = 6;
        for (let i = 0; i < 6; i++) {        
            this.death.push(Object.assign(new Image(), { src: `sprites/hero/death/${i + 1}.png`, width: 51 *(4/3) * this.size, height: 53 * this.size }));
        }






        this.animationSpeed = this.idleSpeed;
        this.animation = this.idle;
    }
    hitBox(draw=true){
        if (draw){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x+this.hitbox[2]*this.size,this.y+this.hitbox[3]*this.size,this.hitbox[0]*this.size,this.hitbox[1]*this.size);
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x+this.attack_hitbox[2]*this.size,this.y+this.attack_hitbox[3]*this.size,this.attack_hitbox[0]*this.size,this.attack_hitbox[1]*this.size);
        }else{
            return [[this.x+this.hitbox[2]*this.size,this.y+this.hitbox[3]*this.size,this.hitbox[0]*this.size,this.hitbox[1]*this.size],[this.x+this.attack_hitbox[2]*this.size,this.y+this.attack_hitbox[3]*this.size,this.attack_hitbox[0]*this.size,this.attack_hitbox[1]*this.size]];
        }

    }
    drawHealth(){
        ctx.fillStyle = "purple";
        ctx.fillRect(10,10,600,50);
        ctx.fillStyle = "cyan";
        ctx.fillRect(10,10,600 * this.health / this.maxHealth,50);
        
    }
    play_animation(dtime){
        if (this.attacking && Math.floor(dtime*this.animationSpeed%this.animation.length) == this.animation.length-1){
            this.tog = 1;
            this.attacking = 0;
        }
        if (this.animation == this.attack1){
            if (3 == Math.floor(dtime*this.animationSpeed%this.animation.length)){
                this.attack_hitbox = [57,68,50,0];
            }
        }
        if (this.animation == this.attack2){
            if (1 <= Math.floor(dtime*this.animationSpeed%this.animation.length || Math.floor(dtime*this.animationSpeed%this.animation.length) <= 3)){
                this.attack_hitbox = [57,68,50,0];
            }
        }
        if (this.dead){
            if (Math.floor(dtime*this.deathSpeed%this.death.length) == 5 || this.totally_dead){
                //playSound("gameover");
                this.totally_dead = true;
                document.querySelector(".blackout").style = "display:block;";
                document.querySelector(".gameover").style = "transform: translate(-50%,-50%) scaleY(1);";
                document.querySelector("#score").innerHTML = `Ваш счёт: ${kills}`;
                return this.death[5];
            }else{
                return this.death[Math.floor(dtime*this.deathSpeed%this.death.length)];
            }
        }
        return this.animation[Math.floor(dtime*this.animationSpeed%this.animation.length)];
    }
    move(keys,dt,objects){
        if (keys[controls["leave"]]){
            window.location.href = "index.html";
        }
        if (!this.dead){
        objects[2].forEach(enemy => {
           if (checkCollision(this.hitBox(false),enemy.hitBox(false)) && !enemy.hitted && !enemy.totally_dead){
                enemy.health -= this.damage;
                playSound("hit");
                if (enemy.health > 0){
                    this.health += this.heal;
                }
                if (this.health > this.maxHealth) this.health = this.maxHealth;
                enemy.getHit();
                enemy.x += 40;
                enemy.hitted = true;
            }else if (!checkCollision(this.hitBox(false),enemy.hitBox(false))){
                enemy.hitted = false;
            }
            if (checkCollision(enemy.hitBox(false),this.hitBox(false)) && !enemy.ihit){
                enemy.ihit = true;
                this.health -= enemy.damage;
                if (this.health < 0){
                    this.health = 0;
                }
            }
        });

        if (!keys[controls["attack"]]){
            this.can_attack = true;
        }
        if (keys[controls["attack"]] && this.can_attack){
            this.can_attack = false;
            if (this.tog){
                this.tog = false;
                this.hitbox = [45,52,5.3,16];
                this.y = 660;
                this.x = 160;
                this.width = 108 * this.size;
                this.height = 68 * this.size;
                this.animationSpeed = this.attackSpeed;
                if (this.last_attack == 1){
                    this.animation = this.attack2;
                    this.last_attack = 2;
                } else{
                    this.animation = this.attack1;
                    this.last_attack = 1;
                    
                }
                this.attacking = true;
                dtime = 0;
            }
        }else if (keys[controls["right"]] && !this.attacking){
            this.attack_hitbox = [0,0,0,0];
            this.hitbox = [40,52,0,0];
            this.tog = 1;
            this.x = 190;
            this.y = 740;
            
            this.can_run = true;
            objects[2].forEach(enemy => {
                if (enemy.attacking){
                        this.can_run = false;
                        this.x = 190;
                        this.tog = 1;
                        this.y = 740;
                        this.width = 40 * this.size;
                        this.height = 52 * this.size;
                        this.animationSpeed = this.idleSpeed;
			            this.animation = this.idle;
                    }
            });
            if (this.can_run){
                this.width = 40 * this.size;
                this.height = 52 * this.size;
                this.animationSpeed = this.runSpeed;
                this.animation = this.run;
                objects.forEach(mass => {
                    mass.forEach(el => {
                        el.offset(dt);
                    });
                });
            }
            
        }
        else if (keys[controls["left"]] && !this.attacking){
            this.attack_hitbox = [0,0,0,0];
            this.hitbox = [40,52,0,0];
            this.tog = 1;
            this.x = 190;
            this.y = 740;
            this.width = 40 * this.size;
            this.height = 52 * this.size;
            this.animationSpeed = this.runSpeed * 0.5;
            this.animation = this.run_back;
            objects.forEach(mass => {
                mass.forEach(el => {
                    el.offset(dt,0.5);
                });
            });
            
        }
        if (!keys[controls["right"]] && !this.attacking && !keys[controls["left"]]){
            this.attack_hitbox = [0,0,0,0];
            this.hitbox = [40,52,0,0];
            this.x = 190;
            this.tog = 1;
            this.y = 740;
            this.width = 40 * this.size;
            this.height = 52 * this.size;
            this.animationSpeed = this.idleSpeed
			this.animation = this.idle;
        }
        if (this.health == 0){
            objects[2].forEach(enemy=>{
                if (!enemy.totally_dead && !this.dead){
                    enemy.killed = true;
                    enemy.health = 0;
                    enemy.getHit();
                    enemy.hitted = true;
                }
            });
            if (!this.dead) {
                this.animation == this.death;
                this.x = 190;
                this.y = 740;
                this.size = 5;
                this.width = 40 * this.size;
                this.height = 52 * this.size;
                dtime = 0;
            } 
            this.dead = true;
        }
    }}
    
}




canvas = document.querySelector("#makaronin");
canvas.width = 1920;
canvas.height = 1080;
canvas.style = `width: ${window.innerWidth}px; height: ${window.innerHeight}px;`;
ctx = canvas.getContext("2d");
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
const f = new FontFace('pixel', 'url(Fonts/pixelFont.ttf)');

f.load().then(function(font) {
  document.fonts.add(font);
  ctx.font = '70px pixel';
});
class Background{
    constructor(x = canvas.width){
        this.move_speed = 150;
        this.x = x;
        this.y = 0;
        this.image = Object.assign(new Image(), { src: `sprites/locations/sunset.png`, width: canvas.width, height: canvas.height});
    }
    offset(dt, direction = -1){
        this.x += direction * this.move_speed * dt;
    }
}
class Ground{
    constructor(x = canvas.width){
        this.move_speed = 550;
        this.x = x;
        this.y = 0;
        this.image = Object.assign(new Image(), { src: `sprites/locations/ground.png`, width: canvas.width, height: 400});
    }
    offset(dt, direction = -1){
        this.x += direction * this.move_speed * dt;
    }
}
class Enemy{
    constructor(){
        this.ihit = false;
        this.dtime = 0;
        this.hitted = false;
        this.killed = false;
        this.damage = 15;
        this.tog = true;
        this.hit_tog = true;
        this.dead = false;
        this.totally_dead = false;
        this.close__distance = rand(420,500);
        this.originalY = 780 + rand(-130,130);
        this.x = 2800 + rand(-800,800);
        this.y = this.originalY;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.size = 6;
        this.height = 33 * this.size;
        this.width = 38 * this.size;
        this.hitbox = [38,33,0,0];
        this.attack_hitbox = [0,0,0,0];
        this.speed = 80;
        this.walkSpeed = 13;
        this.move_speed = 550;
        this.walk = [];
        for (let i = 0; i < 12; i++) {
            this.walk.push(Object.assign(new Image(), { src: `sprites/enemy/walk/${i + 1}.png`, width: 38 * this.size, height: 33 * this.size }));
        }

        this.attack = []
        this.attackSpeed = 13;
        for (let i = 0; i < 13; i++) {
            this.attack.push(Object.assign(new Image(), { src: `sprites/enemy/attack/${i + 1}.png`, width: 62 * this.size, height: 40 * this.size }));
        }
        this.hit = [];
        this.hitSpeed = 8;
        for (let i = 0; i < 3; i++) {
            this.hit.push(Object.assign(new Image(), { src: `sprites/enemy/hit/${i + 1}.png`, width: 32 * this.size, height: 34 * this.size }));
        }
        this.death = []
        this.deathSpeed = 13;
        for (let i = 0; i < 17; i++) {
            this.death.push(Object.assign(new Image(), { src: `sprites/enemy/death/${i + 1}.png`, width: 42 * this.size, height: 34 * this.size }));
        }


        this.animation = this.walk;
        this.animationSpeed = this.walkSpeed;
    }
    checkHealth(draw=false){
        if (this.health <= 0){
            this.health = 0;
            this.animation = this.death;
            this.animationSpeed = this.deathSpeed;
            this.dtime = 0;
        }
        if (draw){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x+this.hitbox[0],this.y+this.hitbox[1]-45,150,10);
            ctx.fillStyle = "green";
            ctx.fillRect(this.x+this.hitbox[0],this.y+this.hitbox[1]-44,150 * (this.health/this.maxHealth),8);
        }

    }
    offset(dt,direction = -1){
        this.x += direction * this.move_speed * dt;
    }

    getHit(){
        if (this.hit_tog){
            this.width = 32 * this.size;
            this.height = 34*this.size;
            this.y = this.originalY;
            this.hit_tog = false;
            this.animation = this.hit;
            this.animationSpeed = this.hitSpeed;
            
            this.dtime = 0;
        }
        if (this.health <= 0){
            if (!this.dead && !this.killed){
                playSound("death_skeleton");
                this.dead = true;
            }
            this.width = 42 * this.size;
            this.health = 0;
            this.hitbox = [0,0,0,0];
            this.animation = this.death;
            this.attacking = false;
            this.animationSpeed = this.deathSpeed;
            this.dtime = 0;
            this.attdtime = 0;
        }
    }
    kill(){
        this.hitted = true;
        this.attacking = false;
        this.hit_tog = false;
        this.tog = false;
        this.health = 0;
        this.getHit();
    }
    move(dt){
        if (this.hit_tog){
            if (this.x >= this.close__distance){
                this.x -= this.speed*dt;
                this.animation = this.walk;
                this.attacking = false;
                this.animationSpeed = this.walkSpeed;
                this.height = 33 * this.size;
                this.width = 38 * this.size;
                this.hitbox = [38,33,0,0];
                this.y = this.originalY;
                this.tog=true;
            }else{
                if (this.tog){
                    this.x = this.close__distance - 22*this.size;  
                    this.tog = false;
                    this.attdtime = 0;
                }
                this.attacking = true
                this.width = 62*this.size;
                this.height = 40*this.size;
                this.animation = this.attack;
                this.animationSpeed = this.attackSpeed;
                this.y = this.originalY - 8*this.size;
                this.hitbox = [22,32,22,8];
            }
        }
    }
    play_animation(dtime,dt){
        this.dtime += dt;
        this.attdtime += dt;
        if (this.totally_dead){
            objects[2].splice(objects[2].indexOf(this), 1);
        }
        if (this.animation == this.attack){
            if (5 <= Math.floor(this.attdtime*this.animationSpeed%this.animation.length) && 6 >= Math.floor(this.attdtime*this.animationSpeed%this.animation.length)){
                this.attack_hitbox = [51,28,0,0];
            }else if(9 <= Math.floor(this.attdtime*this.animationSpeed%this.animation.length) && 10 >= Math.floor(this.attdtime*this.animationSpeed%this.animation.length)){
                this.attack_hitbox = [62,24,0,8];
            }
            else{
                this.ihit = false;
                this.attack_hitbox = [0,0,500,0];
            }
            return this.animation[Math.floor(this.attdtime*this.animationSpeed%this.animation.length)];

        }
        else if (this.animation == this.hit){
            if (Math.floor(this.dtime*this.animationSpeed%this.animation.length) == 2){
                this.animation = this.walk;
                this.animationSpeed = this.walkSpeed;
                this.hit_tog = true;
                if (this.attacking){
                    this.x = this.close__distance - 22*this.size;
                }
            }
            return this.animation[Math.floor(this.dtime*this.animationSpeed%this.animation.length)];
        }else if (this.animation == this.death){
            this.attack_hitbox =[0,0,500,0];
            if (Math.floor(this.dtime*this.animationSpeed%this.animation.length) == 16 && !this.totally_dead){
                this.totally_dead = true;
                if (!this.killed){
                    kills++;
                    counterP.innerHTML = `Шкелетов убито: ${kills}`;
                }
            }
            return this.animation[Math.floor(this.dtime*this.animationSpeed%this.animation.length)];
        }
        else{
            return this.animation[Math.floor(dtime*this.animationSpeed%this.animation.length)];
        }
    }
    hitBox(draw = true){
        if (draw){
            ctx.fillStyle = "red";
            ctx.fillRect(this.x+this.hitbox[2]*this.size,this.y+this.hitbox[3]*this.size,this.hitbox[0]*this.size,this.hitbox[1]*this.size);
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x+this.attack_hitbox[2]*this.size,this.y+this.attack_hitbox[3]*this.size,this.attack_hitbox[0]*this.size,this.attack_hitbox[1]*this.size);
        }else{
            return [[this.x+this.hitbox[2]*this.size,this.y+this.hitbox[3]*this.size,this.hitbox[0]*this.size,this.hitbox[1]*this.size],[this.x+this.attack_hitbox[2]*this.size,this.y+this.attack_hitbox[3]*this.size,this.attack_hitbox[0]*this.size,this.attack_hitbox[1]*this.size]];
        }
}
}

objects = [[new Background(0),new Background()],[new Ground(0),new Ground()],[new Enemy()]];

let keys = {};
window.addEventListener("keydown", function(event) {
    keys[event.code] = true;
});
window.addEventListener("keyup", function(event) {
    keys[event.code] = false;
});


makar = new Player();

let dtime = 0;
let lastTime = Date.now();

setInterval(function(){

    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(objects[0][0].image,0,0,canvas.width,canvas.height);
    ctx.drawImage(objects[0][0].image,objects[0][0].x,0,canvas.width,canvas.height);
    ctx.drawImage(objects[0][1].image,objects[0][1].x,0,canvas.width,canvas.height);
    if (objects[0][1].x <= 3){
        objects[0].shift();
        objects[0].push(new Background(canvas.width-3));
    }
    if (objects[0][0].x +canvas.width >= canvas.width){
        objects[0].pop();
        objects[0].unshift(new Background(-canvas.width + 3));
    }
    
    ctx.drawImage(objects[1][0].image,0,800,canvas.width,400);
    ctx.drawImage(objects[1][0].image,objects[1][0].x,800,canvas.width,400);
    ctx.drawImage(objects[1][1].image,objects[1][1].x,800,canvas.width,400);
    if (objects[1][1].x <= 3){
        objects[1].shift();
        objects[1].push(new Ground());
    }
    if (objects[1][0].x +canvas.width >= canvas.width){
        objects[1].pop();
        objects[1].unshift(new Ground(-canvas.width));
    }
    
    objects[2].forEach(enemy => {
        enemy.move(dt);
        //enemy.hitBox();
        ctx.drawImage(enemy.play_animation(dtime,dt), enemy.x, enemy.y, enemy.width,enemy.height);
    });
    let enemies = 0;
    objects[2].forEach(enemy => {
        if (enemy.health > 0){
            enemies++;
        } 
    });
    if (makar.health > 0 && enemies < (1/makar.health)*makar.maxHealth*5){
        objects[2].push(new Enemy());
    }

    //makar.hitBox();
    makar.drawHealth();
    ctx.drawImage(makar.play_animation(dtime), makar.x, makar.y, makar.width ,makar.height);
    makar.move(keys,dt,objects);

    lastTime = now;

    dtime += dt
},16)