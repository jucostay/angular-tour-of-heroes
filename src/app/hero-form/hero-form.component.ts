import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero, HeroUniverse } from '../hero';
import { HeroService } from '../hero.service';
import {FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})

export class HeroFormComponent implements OnInit {

  @Input() hero!: Hero;
  @Output() heroSaved: EventEmitter<void> = new EventEmitter<void>();
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
  heroUniverses: Array<HeroUniverse> = [HeroUniverse.DC, HeroUniverse.MARVEL];

  formGroup!: FormGroup;

  constructor(
    private Formbuilder: FormBuilder,
    private heroService: HeroService
  ) { }

  ngOnInit (){
    this.formGroup = this.Formbuilder.group({
      name: [this.hero.name, [Validators.required]],
      id: [this.hero.id],
      description:[this.hero.description, [Validators.required]],
      imageUrl: [this.hero.imageUrl, [Validators.required, Validators.pattern((' *?https{0,1}:\/\/w{0,3}.*| *?ftp:\/\/w{0,3}.*| *?\n|^$')
      )]],
      universe: [this.hero.universe],
    });
  }
 
  onGoBack(): void {
    this.goBack.emit();
  }
  
  save(): void {
    let hero: Hero = this.formGroup.value;
    if (hero.id) {
      this.heroService.updateHero(hero)
      .subscribe(() => this.heroSaved.emit());
    } else {
      this.heroService.addHero(hero)
      .subscribe(() => this.heroSaved.emit());
    }
}
}
