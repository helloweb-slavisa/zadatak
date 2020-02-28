		//prikaz godine 
		var d = new Date();
		document.getElementById("vreme").innerHTML = d.getFullYear();


		korpa=[]; // niz za preuzimanje svih podataka 


		var rezultat=document.getElementById("rezultat");
		var rezultat1=document.getElementById("rezultat1");
		var rezultat2=document.getElementById("rezultat2");
		var rezultat3=document.getElementById("rezultat3");
		var svi=document.getElementById("svi");

		// ajax......
		var ourRequest = new XMLHttpRequest();    
				ourRequest.open('GET', 'redvoznje.json');
				ourRequest.onload = function(){
				if (ourRequest.status >= 200 && ourRequest.status < 400){
				var ourData = JSON.parse(ourRequest.responseText);
				renderHTML(ourData);
				}else{
				alert('Kонектовани смо са сервером, али имамо грешку.');
				}
				};
				ourRequest.send();

				function renderHTML(data){
				for (i = 0; i < data.length; i++){
				departure.innerHTML += "<option>" + data[i].odlazak +  "</option>";
				arrival.innerHTML += "<option>" + data[i].dolazak +  "</option>"; 
				svi.innerHTML += "<td>" + data[i].odlazak + "</td><td>" + data[i].vodlazak + "</td><td>" + data[i].dolazak + "</td><td>" + data[i].vdolaska + "</td>" ; 
				korpa.push(data[i]);  //ubacivanje podataka u memoriski niz
	 			}
			}

				console.log(korpa);	//provera dali su se ucitali svi polasci	
		
		//pretraga zadate linije
		function trazenje() {

		// Dependency injection tehnika, prosledjivanje izabranih gradova i funcije za pretragu
		var mojeLinije;
		mojeLinije = new Component(document.getElementById("departure").value, document.getElementById("arrival").value);
    	mojeLinije.kreni();

		function Component(departure, arrival) {
    	this.departure = departure;
    	this.arrival = arrival;
		this.kreni=function(){
		
		//brisanje predhodnog rezultata
		rezultat.innerHTML="";
		rezultat1.innerHTML="";
		rezultat2.innerHTML="";
		rezultat3.innerHTML="";
	
		var x=0;
		var y=0;
		var kljucOdlaska = 0;
		var kljucDolaska = 0;

		//petlja za trazenje odlaska i dolaska destinacije u nizy
		for (i = 0; i < korpa.length; i++){		
			if(korpa[i].odlazak === this.departure){
			rezultat.innerHTML += "полазак: <span style='color:rgba(0,123,255,0.9);'>" + korpa[i].odlazak + "</span> " + korpa[i].vodlazak;
			kljucOdlaska = x; //key vrednost odlaska 
			}
			if(korpa[i].dolazak === this.arrival){
			rezultat1.innerHTML += "долазак: <span style='color:rgba(0,123,255,0.9);'>" + korpa[i].dolazak + " </span> "+ korpa[i].vdolaska;
			kljucDolaska = y; //key vrednost dolaska
			}
			x++;
			y++;
		 }

		// petlja za trazenje grada u kojem se preseda i u kojem vremenskom periodu
		var k=0; 
		for (z = 0; z < korpa.length; z++){	
			if([z] >= kljucOdlaska && [z] < kljucDolaska){
			rezultat2.innerHTML += "<span style='color:rgba(0,123,255,0.9);'>" + korpa[z].dolazak + "</span>" + " " +" од " +korpa[z].vdolaska + " до " + korpa[z+1].vodlazak + "<br>";
			k++;
			}
		}
		// broj presedanja
		rezultat3.innerHTML= "<br> број преседања: " + k;

		// prikaz poruke ако se linija ne zavrsava u istom danu
		var nista=rezultat2.innerHTML;
			if(nista=="" && kljucOdlaska!==kljucDolaska){
			rezultat2.innerHTML = "<br> Изабрана линија укључује ноћење у <span style='color:rgba(0,123,255,0.9);'> Краљеву</span>.";
			rezultat3.innerHTML="";
			} 
		}
		}
		}
	
			//prikaz i skrivanje pretrazi polazaka
			$(document).ready(function(){
			$("#pretrazi1").click(function(){
			$("#dobrodosli").slideUp("slow");
			$("#pretraga2").slideDown("slow");
			$("#pretraga").slideDown("slow");
			$("#pretraga1").slideDown("slow");
			$("#prikaz").slideUp("slow");			
			});
			});

			//prikaz i skrivanje prikazi polazaka
			$(document).ready(function(){
			$("#prikazi1").click(function(){
			$("#dobrodosli").slideUp("slow");
			$("#prikaz").slideDown("slow");
			$("#pretraga2").slideUp("slow");	
			$("#pretraga").slideUp("slow");	
			$("#pretraga1").slideUp("slow");				
			});
			});

			//prikaz za dobrodosli
			$(document).ready(function(){
			$("#logo").click(function(){
			$("#dobrodosli").slideDown("slow");
			$("#prikaz").slideUp("slow");
			$("#pretraga2").slideUp("slow");	
			$("#pretraga").slideUp("slow");	
			$("#pretraga1").slideUp("slow");				
			});
			});

