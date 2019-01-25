function senoidal( 
	options = {
		appDiv : 'app-sin',
		maxWidth : 950,
		msgs : [
			'[450 million years ago] </br>Sharks and rays living peacefully', 
			'extinction of dinosaurs', 
			'[100 years ago] </br>Industrialised commercial fishing begins; </br>1/4 of sharks now face threat of extinction'
		]
	} 
){
	//privates
	let self = this;
	let appDiv = options.appDiv;
	let maxWidth = options.maxWidth;
	let msgsCount = options.msgs.length;
	let msgs = options.msgs;
	let scene;
	let actualPix = 0; // attribute set for animation

	//publics
	this.getmaxWidth = function(){ return maxWidth }
	this.getMsgs = function(){ return msgs }
	this.getScene = function(){
		scene = document.getElementById( appDiv );
		return scene;
	}

	// function to convert string messages to html objects
	this.renderMsgs = function(){
		let htmlMsgs = '';
		msgs.forEach( function( m ){
			htmlMsgs = htmlMsgs + '<div class="msg_hidden msg" id="m'+msgs.indexOf( m )+'">'+ m +'</div>';
		});
		return htmlMsgs;
	}

	// function that creates the ruler and the wave
	this.renderRuler = function(){
		let htmlRuler = '';
		htmlRuler = htmlRuler + '<div id="ruler"><div id="wave"></div></div>'
		return htmlRuler;
	}

	// function to animate the wave progress
	this.animateWave = function(){
		let hWave = document.getElementById('wave');
		if( hWave ){
			hWave.style.width = actualPix + 'px';
		}	
	}

	// function animates messages while wave grows
	this.animateMsg = function( item ){
		let hMsg = document.getElementsByClassName('msg')[ item ];
		if( hMsg){
			//hMsg.style.left = actualPix + 'px' ;
			hMsg.classList.remove( 'msg_hidden' );
		}
		
	}

	// function that hides all the msgs
	this.hideMsgs = function(){
		let hMsg = document.getElementsByClassName('msg');
		for( var i = 0; i < hMsg.length; i ++ ){
			hMsg[i].classList.add( 'msg_hidden' );
		}
	}

	this.animateAll = function(){
		
		let timer;
		let animationDuration = 5; // in seconds
		// this number is the result of divide the wave length by the animation estimated duration
		let pixelsPerSec = maxWidth/animationDuration;
		let timeInter = 10; //loop time in ms
		let i = 0;

		timer = setInterval(
			function(){
				actualPix += ( pixelsPerSec * timeInter / 1000 ) ;
				if( actualPix > 2*maxWidth ){
					actualPix = 0;
					i = 0;
					self.hideMsgs();
				}
				if( actualPix < maxWidth ){
					self.animateWave();
				}

				if( actualPix + maxWidth/10 >  i * maxWidth/(msgsCount-1) ){
					self.animateMsg( i );
					i ++;
				}
			}
		, timeInter)
	}

	// function that creates the scene
	this.renderScene = function(){	
		htmlScene = this.getScene();
		htmlScene.innerHTML = this.renderRuler() + this.renderMsgs() ;
		this.animateAll();
		console.log( 'class', htmlScene );
	}


}







