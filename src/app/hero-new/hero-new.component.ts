import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})

export class HeroNewComponent implements OnInit {
  
  //No componente hero-new inicia o heroi no json em branco 
  hero: Hero = {} as Hero;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  onGoback() {
    this.location.back(); 
  }

  onSaved(){
    this.location.back();
  }

}
