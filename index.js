const interactButton = document.querySelector('#interact-button');

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
updateCanvasSize();

const image = new Image();


const foregroundImage = new Image();
const textBoxImage = new Image();
textBoxImage.src = './img/text-box.png'
const collision = [];
const battleZone = [];

const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';
const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';
const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';
const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';
const RiseImage = new Image();
RiseImage.src = './img/Rise.png';

const myImage = new Image();
myImage.src = './img/myself.png';

const OpeningString = `Hello there! Welcome to Taufiq personal website! ` +

    `Unlike other websites where you just scroll and browse, here you'll navigate the world like an early RPG game. 🌟 ` +
    `You can move using keyboard WASD keys. ` +

    `Feel free to explore, interact with the surroundings, and have fun discovering everything this little world has to offer. Oh, and don’t miss the Monster battle feature—it’s my favorite! 🐾⚔️` +

    `Have fun, and let me know what you think! ` +
    `Press Enter to close this text box`

const textBox = new TextBox({ str: OpeningString, image: textBoxImage });

const actionQueue = [];
let currentInteractable;
let interacting = false;


var options = {
    zone: canvas,
    mode: 'dynamic', // 'static' to have the joystick stay in one place
    color: 'grey', // Optional: customize the joystick color
    size: 150, // Optional: customize the joystick size
    threshold: 0.1 // Optional: adjust sensitivity

};

var manager = nipplejs.create(options);



for (i = 0; i < collisionData.length; i += 70) {
    collision.push(collisionData.slice(i, i + 70));
}

const boundaries = [];
const battleZones = [];

for (j = 0; j < battlezoneData.length; j += 70) {
    battleZone.push(battlezoneData.slice(j, j + 70));
}
// Player's position in the game world
const player = {
    x: 325, // Initial x-coordinate in the game world
    y: 745, // Initial y-coordinate in the game world
    width: 50, // Width of player sprite
    height: 72, // Height of player sprite
};


const offset = {
    x: -864 + canvas.width / 2,
    y: -1656 + canvas.height / 2
};

const interactables = [
    new Interactable({
        position: {
            x: 792 + offset.x,
            y: 1750 + offset.y
        },
        width: 80,
        height: 90,
        actions: [
            {
                action: "talking",
                text: `Hi, I’m Taufiq, a software engineer with experience in Golang, JavaScript, and TypeScript. I’ve worked on both frontend and backend development, but I have a strong interest in backend engineering, especially with Golang.`,
                fn: textBox.StartDialogue.bind(textBox),
                character: './img/nipon.gif',
            },
            {
                action: "talking",
                text: `I’ve contributed to building web applications, handling APIs, and working with technologies like Docker and Kubernetes for deployment. I enjoy solving complex problems and optimizing systems for performance and scalability.`,
                fn: textBox.StartDialogue.bind(textBox),
                character: './img/nipon.gif',
            },
            {
                action: "talking",
                text: `What do you want to know more about me?`,
                fn: textBox.StartDialogue.bind(textBox),
                character: './img/nipon.gif',
            },
            {
                action: "options",
                text: "what do you want to do next?",
                fn: openOptionBox,
            }
        ]
    })
    ,new Interactable({
    position: {
        x: 1220 + offset.x,
        y: 1880 + offset.y
    },
    width: 80,
    height: 50,
    actions: [
        {
            action: "modal",
            title: "KOPRA by Mandiri",
            images: [
                {
                    src: "img/portofolio/KOPRA1.png",
                    alt: "KOPRA Homepage",
                },
                {
                    src: "img/portofolio/KOPRA2.png",
                    alt: "KOPRA About",
                },
                {
                    src: "img/portofolio/KOPRA3.png",
                    alt: "KOPRA Contact",
                }
            ],
            content: `<p>
            <strong>KOPRA by Mandiri</strong> is a supply chain management platform developed to streamline
            transactions for principals, suppliers, and distributors.
        </p>
        <p>
            As a Frontend Developer on this project, my primary focus was on building and enhancing the supply
            chain UI using <strong>Angular 16</strong>. I was responsible for creating web logic to ensure
            smooth user interactions and managing shared internal UI components to maintain consistency across
            the platform.
        </p>
        <p>
            My contributions also included improving and optimizing various features to deliver a seamless user
            experience, meeting the expectations of diverse stakeholders in the supply chain ecosystem.
        </p>`,

        }
    ]
}),
new Interactable({
    position: {
        x: 3652 + offset.x,
        y: 2020 + offset.y,
    },
    width: 80,
    height: 160,
})];

function handleModalEvent(e) {
    const title = document.querySelector('#modal-title');
    const carrouselImages = document.querySelector('#carousel-images');
    const description = document.querySelector('#modal-description');

    title.innerHTML = e.title;
    carrouselImages.innerHTML = '';
    e.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        carrouselImages.appendChild(img);
    });
    description.innerHTML = e.content;
}




collision.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1432) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.height + offset.x,
                        y: i * Boundary.width + offset.y
                    }
                })
            )
        }

    })
});

battleZone.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol == 1537) {
            battleZones.push(new Boundary({
                position: {
                    x: j * Boundary.height + offset.x,
                    y: i * Boundary.width + offset.y
                },
            })
            )
        }
    })
})



const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
});
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});
const rise = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: RiseImage,
    scale: 1
});
const myself = new Sprite({
    position: {
        x: 792 + offset.x,
        y: 1750 + offset.y
    },
    image: myImage
})
    


const battle = {
    initiated: false
}




const playerSprite = new Sprite({
    position: {
        x: canvas.width / 2,
        y: canvas.height / 2,
    },
    image: playerDownImage,
    frames: { max: 4 },
    scale: 1,
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    arrowUp: {
        pressed: false
    },
    arrowDown: {
        pressed: false
    },
    enter: {
        pressed: false
    }
}

/**
 * Calculates whether two rectangles are colliding.
 * @param {Object} options - Contains the two rectangles to check for collision.
 * @param {Object} options.rectangle1 - The first rectangle.
 * @param {Object} options.rectangle2 - The second rectangle.
 * @returns {boolean} True if the rectangles are colliding, false otherwise.
 */
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
};

function updateCanvasSize() {
    const viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    const viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    canvas.width = viewportWidth;
    canvas.height = viewportHeight;
};

const movables = [background, ...boundaries, foreground, ...battleZones, ...interactables,myself]
function animate() {
    window.requestAnimationFrame(animate)
    updateCanvasSize();

    background.draw()
    // Draw boundaries adjusted for camera movement
    boundaries.forEach(boundary => {
        boundary.draw();
    });
    battleZones.forEach(bz => {
        bz.draw();
    });



    myself.draw();
    playerSprite.draw();
    foreground.draw();

    interactables.forEach((interact) => {
        interact.draw();
    });

    let CanInteract = false; // Initialize as false

    interactables.forEach((interact) => {
        if (rectangularCollision({
            rectangle1: playerSprite,
            rectangle2: interact
        })) {
            currentInteractable = interact;
            interactButton.style.display = ''; // Show button
            CanInteract = true; // Set to true if at least one condition is satisfied
        }
    });

    // Hide the button if no interactable satisfies the condition
    if (!CanInteract) {
        currentInteractable = null;
        interactButton.style.display = 'none';
    }

    // Update the playerSprite's CanInteract property
    playerSprite.CanInteract = CanInteract;



    if (battle.initiated || isModalOpen) return;

    if (keys.a.pressed || keys.w.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            //#region Area Calculation
            const zone = battleZones[i]
            const overlappingArea = (
                Math.min(
                    playerSprite.position.x + playerSprite.width,
                    zone.position.x + zone.width
                )
                - Math.max(
                    playerSprite.position.x,
                    zone.position.x)
            ) * (
                    Math.min(
                        playerSprite.position.y + playerSprite.height,
                        zone.position.y + zone.height
                    ) -
                    Math.max(
                        playerSprite.position.y,
                        zone.position.y
                    )
                )
            //#endregion


            if (
                rectangularCollision({
                    rectangle1: playerSprite,
                    rectangle2: zone
                }) &&
                overlappingArea > (playerSprite.height * playerSprite.width) / 2 &&
                Math.random() < 0.01
            ) {
                battle.initiated = true;
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    backgroundColor: "red", // Adds a red tint for a dangerous vibe
                    duration: 0.4,
                    repeat: 3,
                    yoyo: true,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            backgroundColor: "black", // Resets the color
                            duration: 0.4,
                            onComplete() {
                                DirectionButton.TriggerButton(false);
                                animateBattle();
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 1,
                                    onComplete() {
                                        worm.health = 100;
                                        myMonster.health = 100;
                                        restoreHealth(worm, 100);
                                        restoreHealth(myMonster, 100);
                                        resetOpacity(worm);
                                        resetOpacity(myMonster);
                                        const battleCommand = document.querySelector('#battleCommand');
                                        battleCommand.style.display = 'flex';

                                        gsap.to("#battleCommand", {
                                            duration: 1.5, // Animation duration in seconds
                                            width: "calc(100% - 16px)", // Full width of the container
                                            ease: "power3.out", // Smooth easing effect,
                                            onComplete() {
                                                hideDivs()
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

                break;
            }
        }
    }





    if (handleTextBoxInteraction(textBox, playerSprite, canvas)) return;
    handleMovement();

}

function restoreHealth(recipient, maxHealth) {
    // Ensure recipient is valid and has a health property
    if (!recipient || typeof recipient.health === "undefined") {
        console.error("Invalid recipient!");
        return;
    }

    // Restore health to maximum value
    recipient.health = maxHealth;

    // Determine the target health bar based on the recipient
    const targetHealth = recipient.isEnemy ? 'enemyHealthStatus' : 'myHealthStatus';

    // Update the health bar visually
    const currentHealth = recipient.health + "%";
    gsap.to(`#${targetHealth} #currentHealth`, {
        width: currentHealth,
        duration: 1, // Smooth animation for restoring health
    });
}

function resetOpacity(recipient, duration = 0.1) {

    // Set opacity back to 1 on both the recipient object and the DOM
    gsap.to(recipient, {
        opacity: 1,
        duration: duration,
        onComplete: () => {
            recipient.opacity = 1; // Update the object's property
        },
    });
}


function handleTextBoxInteraction(textBox, playerSprite, canvas) {
    if (!textBox.onDialog) return false; // Return false if there's no dialog interaction

    // Stop the player's movement and reset animation frames
    playerSprite.animate = false;
    playerSprite.frames.val = 0;

    return true; // Interaction handled
}


function handleMovement() {
    if (keys.w.pressed) movePlayer('up', 'y', 6)
    else if (keys.s.pressed) movePlayer('down', 'y', -6)
    else if (keys.a.pressed) movePlayer('left', 'x', 6)
    else if (keys.d.pressed) movePlayer('right', 'x', -6)
}

function movePlayer(direction, axis, offset) {
    let moving = true;
    playerSprite.animate = true;
    playerSprite.image = playerSprite.sprites[direction];

    for (let boundary of boundaries) {
        const newBoundaryPosition = {
            x: boundary.position.x,
            y: boundary.position.y
        };
        newBoundaryPosition[axis] += offset; // Only update the relevant axis

        if (
            rectangularCollision({
                rectangle1: playerSprite,
                rectangle2: { ...boundary, position: newBoundaryPosition }
            })
        ) {
            moving = false;
            break;
        }
    }

    if (moving) {
        movables.forEach((movable) => {
            movable.position[axis] += offset;
        });
    }
}



document.querySelector('.battleDialog').addEventListener('click', (e) => {
    if (myMonster.isAttacking || worm.isAttacking) return;
    if (queue.length > 0) {
        if (worm.health > 0) queue[0]();
        else e.currentTarget.style.display = 'none'
        queue.shift();
    } else e.currentTarget.style.display = 'none'

    if (worm.health <= 0 || myMonster.health <= 0) {
        gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
                DirectionButton.TriggerButton(true);
                cancelAnimationFrame(battleAnimationId)
                hideDivs('none');
                battle.initiated = false;
                gsap.to('#overlappingDiv', {
                    opacity: 0,

                })
            }
        })
    }
})




const battleBackgroundImage = new Image();
battleBackgroundImage.src = './img/battleBackground.png'



const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
});
const bgOriginalWidth = 1024; // Replace with your background's original width
const bgOriginalHeight = 576; // Replace with your background's original height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// Calculate scale factors
const scaleX = canvas.width / bgOriginalWidth;
const scaleY = canvas.height / bgOriginalHeight;


const worm = new Monster({
    ...Monsters.Worm,
    position: {
        x: bgOriginalWidth * 0.8 * scaleX,
        y: bgOriginalHeight * 0.2 * scaleY,
    },
});

const myMonster = new Monster({
    ...Monsters.Emby,
    position: {
        x: bgOriginalWidth * 0.3 * scaleX,
        y: bgOriginalHeight * 0.6 * scaleY
    },
});

myMonster.attacks.forEach((attack) => {
    const Button = document.createElement("button")
    Button.innerHTML = attack.name;
    document.querySelector('.battleOption').append(Button);
})

const renderedSpritesEffect = []
let battleAnimationId;

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle);

    // Draw the background
    battleBackground.draw(canvas.height, canvas.width);
    worm.draw();
    myMonster.draw();
    renderedSpritesEffect.forEach((effect) => {
        effect.draw();
    })
}

let timeoutId;

function typeWriter(index, text, textElement, containerElement, obj) {
    if (!textBox.isTalking) {
        clearTimeout(timeoutId);
    }
    if (!textBox.onDialog && !battle.initiated) {
        clearTimeout(timeoutId);
        textBox.hideDialog();
        return;
    }
    if (index < text.length) {
        textElement.textContent += text[index];
        index++;
        // Auto-scroll the container to the bottom
        if (containerElement) {
            containerElement.scrollTop = containerElement.scrollHeight;
        }
        if (keys.enter.pressed) {
            timeoutId = setTimeout(() => typeWriter(index, text, textElement, containerElement), 5)
        } else {
            timeoutId = setTimeout(() => typeWriter(index, text, textElement, containerElement), 50)
        }

    } else {
        // Stop the blinking cursor after typing finishes
        textBox.isTalking = false;
        textElement.style.borderRight = "none";
    }
}





// Load images
image.src = './img/NewMap.png';
foregroundImage.src = './img/Foreground_Map.png'


const queue = []

document.querySelectorAll('#battleCommand button').forEach((button) => {
    button.addEventListener('click', (event) => {
        myMonster.attack({ attack: attacks[event.currentTarget.innerHTML], recipient: worm, renderedSpritesEffect });

        queue.push(() => {
            worm.attack({
                attack: attacks.Tackle,
                recipient: myMonster,
                renderedSpritesEffect
            })
        })
    });
});


function hideDivs(setDiv = '') {
    const ids = ["battleCommand", "enemyHealthStatus", "myHealthStatus"];
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = setDiv;
        }
    });
}


// Update canvas size on resize and recalculate offset
function resizeCanvas() {
    updateCanvasSize();
    const oldPosition = { ...playerSprite.position };
    playerSprite.position.x = canvas.width / 2;
    playerSprite.position.y = canvas.height / 2;
    const deltaPositon = { x: playerSprite.position.x - oldPosition.x, y: playerSprite.position.y - oldPosition.y };

    movables.forEach((obj) => {
        obj.position.x = obj.position.x + deltaPositon.x;
        obj.position.y = obj.position.y + deltaPositon.y;
    })
}

function initActionQueue() {
    const talkingDialog = {
        action: "talking",
        text: "Hello there! Welcome to Taufiq personal website! ",
        fn: textBox.StartDialogue.bind(textBox),
        character: './img/Rise.png',
    };
    const talkingDialog2 = {
        action: "talking",
        text: `You can walk around with WASD or arrow buttons`,
        fn: textBox.StartDialogue.bind(textBox),
        character: './img/Rise.png',
    }
    actionQueue.push(talkingDialog);
    actionQueue.push(talkingDialog2);
}

function interactAction() {
    if (interacting) return;
    interacting = true;

    const actions = currentInteractable.actions;
    //put all of the actions into the action queue
    actions.forEach((action) => {
        actionQueue.push(action);
    });

    dispatchEvent();
}

function dispatchEvent() {
    if (actionQueue.length == 0) {
        interacting = false;
        return;
    }

    const event = actionQueue.shift();
    switch (event.action) {
        case "talking":
            event.fn(event.character, event.text);
            break;
        case "modal":
            handleModalEvent(event);
            openModal();
            break;
        case "download":
            handlePdf(event.action, event.url);
            break;
        case "options":
            event.fn(event.text);
            break;

    }
}

// Initial setup
resizeCanvas();
initDirection();
initActionQueue();

// Listen for window resize
window.addEventListener('resize', resizeCanvas);


// Initial setup
hideDivs('none');

animate();
dispatchEvent();
// textBox.StartDialogue('./img/Rise.png', 'Hello there! Welcome to Taufiq personal website!');
textBox.startSkipButton();
// animateBattle();








