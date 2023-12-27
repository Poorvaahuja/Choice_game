//const currStory = 1;
const playerName = 'Birbal'
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let state = {}
function startStory(){
    state = {}
    showTextNode(1)
}
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach((option) => {
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button)
        }
    })
}
function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}
function selectOption(option){
    const nextTextNodeId = option.nextText
    if(nextTextNodeId === undefined || nextTextNodeId <= 0){
        return startStory()
    }
    state = Object.assign(state, option.setState)
    const nextTextNode = textNodes.find((textNode) => textNode.id === nextTextNodeId);
    showTextNode(nextTextNodeId)
}
document.addEventListener('DOMContentLoaded', () => {
    startStory();
});
const textNodes = [
    {
        id: 1,
        text: 'Emporer Akbar has a challenge for you, ' + playerName + '. Choose a story and solve it to prove your wisdom!!\n',
        setState: {story1: true},
        options:[
            {
                text: 'STORY 1: The farmer who bought a well',
                options: [
                    {
                        id: 1,
                        text: 'A poor farmer once bought a well from a rich man so that he could irrigate his land using the water from the well. The farmer paid the price quoted by the rich man. The next day, when the farmer went to draw water from the well, the rich man stopped him and disallowed him from drawing water. He said that the farmer had bought only the well and not the water from him. So, he cannot draw any water from the well.\nNot knowing what to do, the farmer went to the king’s court and told Akbar about his predisposition. Akbar handed over the case to you.',
                        requiredState: (currentState) => currentState.story1,
                        options: [
                            {
                                text: 'You visit the rich man who was causing problems to the farmer.',
                                setState: { proceed: true},
                                nextText: 2
                            },
                            {
                                text: 'You choose not to visit the rich man.',
                                nextText: 4
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: 'You visited the rich man who was causing problems to the farmer.',
                        options: [
                            {
                                text: 'When the rich man reiterated what he told the farmer, to which you said, “Since you have sold the well and not the water to the farmer, you will have to move all the water or pay rent to the farmer to keep the water in the well.',
                                requiredState: (currentState) => currentState.proceed,
                                setState: { proceed: false, conclusion: true},
                                nextText: 3
                            },
                            {
                                text: 'You are not able to rectify the problem',
                                requiredState: (currentState) => currentState.proceed,
                                setState: {proceed: false, finish: true},
                                nextText: 3
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: 'Conclusion : The rich man realised his plot was not going to work and let the farmer use the well from the water. \n Moral: Do not try to deceive people as you will end up paying the price.',
                        requiredState: (currentState) => currentState.conclusion,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            },
                        ]
                    },
                    {
                        id: 4,
                        text: 'Akbar is displeased with you decision. You lose!',
                        requiredState: (currentState) => currentState.finish,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            }
                        ]
                    }
                ]
            },
            {
                text: 'STORY 2: The thief who robbed the merchant',
                options: [
                    {
                        id: 1,
                        text: 'One day, a rich merchant went to Birbal and complained to him that his house was robbed. He also told him that he suspects one of his servants to have robbed the house.<br>Birbal went to the merchant’s house, rounded up all the servants and asked them who robbed the house.',
                        requiredState: (currentState) => currentState.story2,
                        options: [
                            {
                                text: 'The robber came forward and confessed his crime.!',
                                setState: { proceed: true},
                                nextText: 2
                            },
                            {
                                text: 'The robber will not come forward to confess, and you have to use your wisdom to catch him.',
                                nextText: 2
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: 'The robber didn’t come forward to confess his crime.',
                        options: [
                            {
                                text: 'You hand over a stick to each servant and tel them that the robber’s stick will grow 2 inches longer the next morning. That way, we will be able to identify who robbed the merchant.',
                                requiredState: (currentState) => currentState.proceed,
                                setState: { proceed: false, conclusion: true},
                                nextText: 3
                            },
                            {
                                text: 'The robber is more smarter than you to escape this situation.',
                                requiredState: (currentState) => currentState.proceed,
                                setState: {proceed: false, finish: true},
                                nextText: 4
                            }
                        ]
                    },
                    {
                        id: 4,
                        text: '<br> Conclusion : The next morning, Birbal asked the servants for the sticks and pointed out the culprit to the merchant. The robber had reduced the length of the stick by 2 inches anticipating the stick to grow by the next morning. That’s how you will figure out who the robber is.\n Moral: No matter how hard you try, you can never hide the truth for long.',
                        requiredState: (currentState) => currentState.conclusion,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            }
                        ]
                    },
                    {
                        id: 5,
                        text: 'Akbar is displeased with you decision. You lose!',
                        requiredState: (currentState) => currentState.finish,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            }
                        ]
                    }
                ]
            },
            {
                text: 'STORY 3: The number of crows in Akbar’s Kingdom',
                options : [
                    {
                        id: 1,
                        text: 'Akbar and you (birbal) are taking a stroll in the king’s garden one pleasant morning. Akbar saw the crows in his garden and wondered how many crows there are in his kingdom. He posed the question to you.',
                        options: [
                            {
                                text: 'You accept the challenge to find the number of crows and respond with an instant answer',
                                setState: { proceed: true},
                                nextText: 2
                            },
                            {
                                text: 'You give it some thought, but are unable to figure out',
                                nextText: 4
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: 'You accepted the challenge',
                        options: [
                            {
                                text: 'You say that there are ninety thousand two hundred and forty-nine crows in the kingdom. And Akbar is amazed by your quick response and asks, “What if there is a higher number of crows than the number you just mentioned?”.',
                                requiredState: (currentState) => currentState.proceed,
                                setState: { proceed: false, conclusion: true},
                                nextText: 3
                            },
                            {
                                text: 'You are not able to figure out the answer',
                                requiredState: (currentState) => currentState.proceed,
                                setState: {proceed: false, finish: true},
                                nextText: 4
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: '<br> Conclusion : You replied, “Then, crows from the neighbouring kingdoms must be visiting.” Then Akbar asked, “What if the number is fewer than what you mentioned?”. Birbal calmly replied, “Then, the crows must have gone on a vacation to the neighbouring kingdom”.\n Moral: You can always find a way out if you think at ease.',
                        requiredState: (currentState) => currentState.conclusion,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            }
                        ]
                    },
                    {
                        id: 4,
                        text: 'Akbar is displeased with you decision. You lose!',
                        requiredState: (currentState) => currentState.finish,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            }
                        ]
                    }
                ]
            },
            {
                text: 'STORY 4: Akbar’s stolen ring',
                options: [
                    {
                        id: 1,
                        text: 'Akbar once lost a ring his father had gifted to him. He immediately reach out to you(Birbal) and asked for your help.',
                        options: [
                            {
                                text: 'You say that you will help him find his ring. \n you then tell the courtiers present that you are aware that one of them stole the ring. Akbar angrily asked which one of them stole his ring.',
                                setState: { proceed: true},
                                nextText: 2
                            },
                            {
                                text: 'You know the thief, but keep the secret to yourself.',
                                nextText: 4
                            }
                        ]
                    },
                    {
                        id: 2,
                        text: 'You come up with a good idea !',
                        options: [
                            {
                                text: 'The courtier with the straw in his beard is the one who has the king’s ring. Immediately, the guilty courtier stroked his beard to check for the straw. You point at him and tell Akbar that he is the culprit.',
                                requiredState: (currentState) => currentState.proceed,
                                setState: { proceed: false, conclusion: true},
                                nextText: 3
                            },
                            {
                                text: 'The thief didn’t fall for it.',
                                requiredState: (currentState) => currentState.proceed,
                                setState: {proceed: false, finish: true},
                                nextText: 3
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: 'Moral: A guilty conscience will always give it away.',
                        requiredState: (currentState) => currentState.conclusion,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            }
                        ]
                    },
                    {
                        id: 4,
                        text: 'Akbar is displeased with you decision. You lose!',
                        requiredState: (currentState) => currentState.finish,
                        options: [
                            {
                                text: 'Restart',
                                nextText: -1
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        id: 5,
        text:'Game Over. Thanks for playing!'
    },
]


