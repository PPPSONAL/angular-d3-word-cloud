import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as Cloud from 'd3-cloud';
interface WordCloud {
  weight: number;
  word: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-d3-word-cloud';
  chartData: WordCloud[] = [
    {word:'Food /Gifting', weight: 0.73},
    {word:'Purchase Incidence', weight: 0.6},
    {word:'Purchase Frequency', weight: 0.57},
    {word:'Average Spend', weight: 0.65},
    {word:'Gift Pack Type', weight: 0.53},
    {word:'Gifting Market Size', weight: 0.5},
    {word:'Purchase Channels', weight: 0.5},
    {word:'Purchase Behaviour', weight: 0.6},
    {word:'Appendix', weight: 0.3},
    {word:'Ctrl', weight: 0.2},
    {word:'Fair Share', weight: 0.4},
    {word:'Online Market Share', weight: 0.4},
    {word:'Online Gifters', weight: 0.4},
    {word:'Exchange Rates', weight: 0.3},
    {word:'Comparison', weight: 0.3},
    {word:'US', weight: 0.2},
    {word:'UK', weight: 0.2},
    {word:'France', weight: 0.2},
    {word:'China', weight: 0.4},
    {word:'India', weight: 0.4},
    {word:'Brazil', weight: 0.2},
    {word:'Australia', weight: 0.2},
    {word:'Canada', weight: 0.2},
    {word:'Social Media', weight: 0.3},
    {word:'Grocery', weight: 0.3},
    {word:'Food Speciality', weight: 0.3},
    {word:'DC Websites', weight: 0.3},
    {word:'Harry David', weight: 0.2},
    {word:'Sees Candies', weight: 0.2}]
  fontRange = [40,35,30,25,20];

  ngOnInit(): void {
    this.wordCloud3("figure#wordcloud", 0);
  }

  revoveOldContent() {
    const myNode: any = document.getElementById("wordcloud");
    myNode.innerHTML = '';
  }

  wordCloud3(selector: any, maxFontirrationcount:  any) {
    var fill = d3.scaleOrdinal(d3.schemeCategory10);
    // List of words
    var myWords = this.chartData
    // set the dimensions and margins of the graph
      var width = 510,
      newwidth = 510 - 50,
      height = 230;

    // append the svg object to the body of the page
    var svg = d3.select(selector).append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      // .style("background-color", '#000')
      .attr("class", "chart")
      .attr("viewBox", `0 0 ${width} ${height}`);

    var draw = (words: any) => {
      console.log("Maximumn Number of words:"+ words.length+ " Original number of words:"+myWords.length)
      if(words.length < myWords.length && maxFontirrationcount < this.fontRange.length - 1 ){
        maxFontirrationcount = maxFontirrationcount + 1
        console.log(maxFontirrationcount+"st iteration") 
        this.revoveOldContent()
        this.wordCloud3("figure#wordcloud", maxFontirrationcount);
        return;
      }
      svg
        .append("g")
        // .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-family", '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"')
        // .style("font-family", 'Open Sans')
        .style("fill", function (d, i: any) { return fill(i); })
        .attr("text-anchor", "middle")
        .text(function (d: any) { return d.text; })
        .transition()
        .duration(600)
        .style("font-size", function (d: any) { return d.size + "px"; })
        .style("font-weight", "600")
        .attr("transform", function (d: any) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        });
    }  
    // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
    var fontSizeScale = d3.scalePow().exponent(5).domain([0, 1]).range([12,this.fontRange[maxFontirrationcount]]);
      var layout = Cloud().size([newwidth, height])
        .words(myWords.map(function (d) { return { text: d.word, size: d.weight, fontweight: d.weight }; }))
        .padding(6)
        // .rotate((d: any) => {
        //   let items = [0, 90];
        //   return items[Math.floor(Math.random()*items.length)];
        //   })
        .fontSize(function (d: any) {
          let maxSize: any = d3.max(myWords, function (d) { return d.weight; });
          return fontSizeScale(d.size / maxSize);
        })
        .on("end", draw);
      layout.start();
  }
}
