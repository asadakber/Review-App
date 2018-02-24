import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ReviewsProvider } from '../../providers/reviews/reviews';
import { AddReviewPage } from '../../pages/add-review/add-review';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  reviews: any;
  constructor(public modalCtrl: ModalController,public review: ReviewsProvider,public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.review.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
  }

  addReview(){
 
    let modal = this.modalCtrl.create(AddReviewPage);
 
    modal.onDidDismiss(review => {
      if(review){
        this.reviews.push(review);
        this.review.createReview(review);       
      }
    });
 
    modal.present();
 
  }
 
  deleteReview(review){
 
    //Remove locally
      let index = this.reviews.indexOf(review);
 
      if(index > -1){
        this.reviews.splice(index, 1);
      }  
 
    //Remove from database
    this.review.deleteReview(review._id);
  }
 

}
