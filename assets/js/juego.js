/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades 
 */

(() => {
    'use strict'

    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    
    const crearDeck = () => {
        const newDeck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                newDeck.push(i + tipo)
            }
        }
    
        for (let tipo of tipos) {
            for (let esp of especiales) {
                newDeck.push(esp + tipo);
            }
        }
    
        return _.shuffle(newDeck);
 
    }
    
    let deck = crearDeck();
    
    let puntosJugador = 0,
        puntosComputadora = 0;
    
    //Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const puntosHTML = document.querySelectorAll('small');
    
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');
    
    const pedirCarta = () => {
        if (deck.length === 0)
            throw 'No hay cartas en el deck';
    
        return deck.pop();
    }
    
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
    
    //Turno de la Computadora
    
    const turnoComputadora = (puntosMinimos) => {
    
        do {
            const carta = pedirCarta();
    
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;
    
            //<img class="carta" src="assets/cartas/2C.png" alt=""></img>
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);
    
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert(`${puntosComputadora > puntosMinimos ? 'Computadora' : 'Jugador'} Gana`);
            }
        }, 1000);
    
    }
        //Eventos
        btnPedir.addEventListener('click', () => {
    
        const carta = pedirCarta();
    
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;
        console.log(puntosJugador);
    
        //<img class="carta" src="assets/cartas/2C.png" alt=""></img>
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);
    
        if (puntosJugador > 21) {
            console.warn('Im Sorry, you Lose!!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('OMG! You Win!!!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });
    
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });
    
    btnNuevo.addEventListener('click', () => {
        deck = crearDeck();
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        puntosComputadora = 0;
        puntosJugador = 0;
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        divCartasJugador.innerHTML = '';
        divCartasComputadora.innerHTML = '';
    });

})();



