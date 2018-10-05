
            /* global d3, _, skills */

var minyears,maxyears,minfont,maxfont,bb,width,height,fill,MAX_TRIES,global_div_id,global_color_bool;
function draw_wordCloud(skills,div_id,isPro) {
  global_div_id = div_id;
  global_color_bool = isPro;
  minyears = 0;
  maxyears = 0;
  minyears = _.min(_.map(skills, 'years'));
  maxyears = _.max(_.map(skills, 'years'));
  console.log(div_id+minyears);
  console.log(div_id+maxyears);
  minfont = 18;
  maxfont = 35;
  // console.log(div_id);
  bb = document.querySelector ("#"+div_id)
                      .getBoundingClientRect();
  width = bb.right - bb.left;
  height = 190;

  fill = d3.scaleOrdinal(d3.schemeCategory20);

  // for small screens (and slow cpu's) limit retries
  MAX_TRIES = (width > 400) ? 6 : 3;

  // draw initial cloud wilthout filters
  generateSkillCloud(skills);

}


function generateSkillCloud(skills,retryCycle) {

    var skillsToDraw = transformToCloudLayoutObjects(filterSkills(skills), retryCycle);
    // console.log(skillsToDraw);
    d3.cloud()
        .size([width, height])
        .words(skillsToDraw)
        //.rotate(function() {
        //    return (~~(Math.random() * 6) - 2.5) * 30;
        //})
        .padding(0)
        .font("Impact")
        .fontSize(function(d) {
            return d.size;
        })
        .on("end", function(fittedSkills) {
            // check if all words fit and are included
            if (fittedSkills.length == skillsToDraw.length) {

                drawSkillCloud(fittedSkills); // finished
            }
            else if (!retryCycle || retryCycle < MAX_TRIES) {
                // words are missing due to the random placement and limited room space
                console.debug('retrying');
                // try again and start counting retries
                generateSkillCloud(skills,(retryCycle || 1) + 1);
            }
            else {
                // retries maxed and failed to fit all the words
                console.debug('gave up :(');
                // just draw what we have
                console.log(fittedSkills);
                drawSkillCloud(fittedSkills);
            }
        })
        .start();

    //filter skills based on user input and transform to
    function filterSkills(skills) {
        var textfilter;
        return _.filter(skills, function(skill) {
            return !textfilter || skill.name.toLowerCase().indexOf(textfilter.toLowerCase()) >= 0;
        });
    }

    // convert skill objects into cloud layout objects
    function transformToCloudLayoutObjects(skills, retryCycle) {

        return _.map(skills, function(skill) {
            return {
                text: skill.name.toLowerCase(),
                size: toFontSize(skill.years, 1, retryCycle)
            };
        });
    }

    /**
     * 1. Determine font size based on years of experience relative to the skills with the least and most years of experience.
     * 2. Further increase / decrease font size based on relevancy (linux 20y is could less relevant than java 3y, so relevancy
     *    .2 vs 1.5 could work for example).
     */
    function toFontSize(years, relevancy, retryCycle) {
        // translate years scale to font size scale and apply relevancy factor
        var lineairSize = (((years - minyears) / (maxyears - minyears)) * (maxfont - minfont) * relevancy) + minfont;
        // make the difference between small sizes and bigger sizes more pronounced for effect
        var polarizedSize = Math.pow(lineairSize / 8, 3);
        // reduce the size as the retry cycles ramp up (due to too many words in too small space)
        var reduceSize = polarizedSize * ((MAX_TRIES - retryCycle) / MAX_TRIES);
        return ~~reduceSize;
    }

    function drawSkillCloud(words) {
        d3.select("#"+global_div_id+" svg").remove();
        d3.select("#"+global_div_id).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + ~~(width / 2) + "," + ~~(height / 2) + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) {
                return d.size + "px";
            })
            .style("-webkit-touch-callout", "none")
            .style("-webkit-user-select", "none")
            .style("-khtml-user-select", "none")
            .style("-moz-user-select", "none")
            .style("-ms-user-select", "none")
            .style("user-select", "none")
            .style("cursor", "default")
            .style("font-family", "Impact")
            .style("fill", function(d, i) {
                return global_color_bool?"green":"red";
            })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) {
                return d.text;
            });


        var svg = document.getElementById(global_div_id).childNodes[0];

        var bbox = svg.getBBox();
        var viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ");
        svg.setAttribute("viewBox", viewBox);
        // console.log(svgs.childNodes[0]);


    }
}
