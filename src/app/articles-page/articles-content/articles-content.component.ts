import { Component } from '@angular/core';

@Component({
  selector: 'articles-content',
  templateUrl: './articles-content.component.html',
  styleUrls: ['./articles-content.component.css']
})
export class ArticlesContentComponent {

  articlesButtons = ["Latest", "Highschool", "College", "Archive"];

  selected = "Latest";

  testObj = [
    {
      title: "test article",
      image: "https://venngage-wordpress.s3.amazonaws.com/uploads/2016/10/IconsHeader.png",
      author: "test author",
      date: new Date(),
      content: "https://raw.githubusercontent.com/LemonX19/Helivox-Public/main/6.png"
    },
    {
      title: "test article 2",
      image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg",
      author: "test author 2",
      date: new Date(),
      content: ""
    },
    {
      title: "test article 3",
      image: "https://t3.ftcdn.net/jpg/03/36/97/58/360_F_336975809_VvYkV1QZX2E8igeS3kYpcBGiMcK6zWpL.jpg",
      author: "test author 3",
      date: new Date(),
      content: ""
    }
]

  showArticle = false;

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
    });
  }

}
