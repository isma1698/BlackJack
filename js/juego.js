(()=>{
    'use strict'
    let deck = [];
    const tipos =['C','D','H','S'],
         especiales =['A','J','Q','K'];

    let puntosJugador =0;
    let puntosComputadora =0;

    //referencias de HTML

    const btnPedir= document.querySelector("#btnPedir"),
          btndete= document.querySelector("#btnDetener"),
          btnew= document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
          punt= document.querySelectorAll('small');

    //funcion que inicializa el juego      
    const inicializar= ()=>{
       deck = crearDeck();
        }


    //esta funcion crea una nueva baraja
    const crearDeck = ()=>{

        deck =[];
        for(let i = 2; i<=10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }   
            //deck.push(i + 'c');
        } 
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }  
        } 
        return _.shuffle(deck);

    }
    
    //esta funcion me da una carta

    const pedircarta =()=>{
        //condicion si se acaban las cartas
        if(deck.length === 0){
            throw 'no hay cartas en el deck';
        }
        return deck.pop();
    }


        const valorcarta =(carta)=>{
            const valor = carta.substring(0, carta.length -1);
            return(isNaN(valor))?
                (valor === 'A')? 11: 10
                :valor * 1;
            //let puntos =0;
            // if(isNaN(valor)){
            //     puntos =(valor === 'A') ? 11 :10;
            //     console.log('No es un numero');
            // }else{
            //     console.log('es un numero');
            //     puntos = valor *1;
            // } 
            // console.log(puntos);
        }

    //turno computadora
    const turnoComputadora =(puntosMinimos)=>{

        do{
            const carta = pedircarta();
            puntosComputadora = puntosComputadora +valorcarta(carta);
            
            //console.log(puntosJugador);
            punt[1].innerText= puntosComputadora;
        
            // <img class="carta" src="Assets/cartas/2C.png" ></img>
            const imgCarta= document.createElement('img');
            imgCarta.src=`Assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if(puntosMinimos >21){
                break;
            }

        } while( (puntosComputadora < puntosMinimos) && puntosMinimos <=21);
        
        setTimeout(() => {

            if(puntosComputadora === puntosMinimos){
                alert('empate');
            }else if(puntosMinimos > 21){
                alert('computadora gana');
            }else if(puntosComputadora >21){
                alert('jugador gana');
            }else{
                alert('computadora gana');
            }
        }, 100 );           
    }

        //eventos
    btnPedir.addEventListener('click', ()=>{

        const carta = pedircarta();
        puntosJugador = puntosJugador +valorcarta(carta);
        
        console.log(puntosJugador);
        punt[0].innerText= puntosJugador;

        const imgCarta= document.createElement('img');
        imgCarta.src=`Assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if(puntosJugador > 21){
            console.warn('F perdiste');
            btnPedir.disabled =true;
            btndete.disabled =true;

            turnoComputadora(puntosJugador);


        }else if (puntosJugador === 21){
            console.warn('21 ganaste');
            btndete.disabled =true;
            btnPedir.disabled =true;

            turnoComputadora(puntosJugador);
        }
        
    })

    btndete.addEventListener('click', () =>{

        btnPedir.disabled =true;
        btndete.disabled =true;
        turnoComputadora(puntosJugador);

    });

    //TODO: Borra
    //turnoComputadora(15);

    btnew.addEventListener('click', ()=>{
        console.clear();
        deck =[];
        deck=crearDeck();
        puntosJugador =0;
        puntosComputadora =0;
        
        punt[0].innerText =0;
        punt[1].innerText =0;

        divCartasComputadora.innerHTML='';
        divCartasJugador.innerHTML='';

        btnPedir.disabled =false;
        btndete.disabled =false;

    })

})();
