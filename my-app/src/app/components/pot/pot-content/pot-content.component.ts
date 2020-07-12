import {Component, Input, OnInit} from '@angular/core';
import {PotsType} from '../../../types/PotsType';
import {HttpServiceService} from "../../../services/http/http-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../../services/cart/cart.service";

@Component({
  selector: 'app-pot-content',
  templateUrl: './pot-content.component.html',
  styleUrls: ['./pot-content.component.css']
})
export class PotContentComponent implements OnInit {
  @Input() pot: PotsType;
  loaded: boolean;

  constructor(private httpService: HttpServiceService,
              private route: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.loaded = false;
    this.route.paramMap.subscribe((params: any) => {
      this.httpService.getPot(params.get("id")).subscribe((x) => {
        this.pot = x;
        this.loaded = true;
      })
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

}
