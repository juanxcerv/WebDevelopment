var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    data       = [
                    {
                        name: "Water Falls", 
                        image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1650&q=80",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ut tellus elementum sagittis vitae et. Tellus at urna condimentum mattis pellentesque id nibh tortor. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Fringilla ut morbi tincidunt augue interdum velit. Aliquet enim tortor at auctor urna. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Nunc faucibus a pellentesque sit. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Malesuada fames ac turpis egestas."
                    },
                    {
                        name: "SkyRim", 
                        image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1650&q=80",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ut tellus elementum sagittis vitae et. Tellus at urna condimentum mattis pellentesque id nibh tortor. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Fringilla ut morbi tincidunt augue interdum velit. Aliquet enim tortor at auctor urna. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Nunc faucibus a pellentesque sit. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Malesuada fames ac turpis egestas."
                    },
                    {
                        name: "Jaina's Kingdom", 
                        image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?auto=format&fit=crop&w=1650&q=80",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ut tellus elementum sagittis vitae et. Tellus at urna condimentum mattis pellentesque id nibh tortor. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Fringilla ut morbi tincidunt augue interdum velit. Aliquet enim tortor at auctor urna. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Nunc faucibus a pellentesque sit. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Malesuada fames ac turpis egestas."
                    },
                    {
                        name: "How Long Must This Go On", 
                        image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?auto=format&fit=crop&w=1650&q=80",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ut tellus elementum sagittis vitae et. Tellus at urna condimentum mattis pellentesque id nibh tortor. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Fringilla ut morbi tincidunt augue interdum velit. Aliquet enim tortor at auctor urna. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Nunc faucibus a pellentesque sit. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Malesuada fames ac turpis egestas."
                    },
                    {
                        name: "Simple", 
                        image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=1651&q=80",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Ut tellus elementum sagittis vitae et. Tellus at urna condimentum mattis pellentesque id nibh tortor. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Fringilla ut morbi tincidunt augue interdum velit. Aliquet enim tortor at auctor urna. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Nunc faucibus a pellentesque sit. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Malesuada fames ac turpis egestas."
                    }
                ], 
    seedDB      = function(){
                    Campground.remove({}, function(err){
                        (err) ? console.log(err) : console.log("Removed Campgrounds");
                        data.forEach(function(seed){
                            Campground.create(seed, function(err, camp){
                                (err) ? console.log(err) : Comment.create({text:"This place is great, bring mosquito repellant!", author: "WildMan"},
                                    function(err, comment){
                                        if (err){
                                            console.log(err);
                                        } else {
                                            camp.comments.push(comment);
                                            camp.save();
                                        }
                                    });
                            });
                        });
                    });
                };

module.exports = seedDB;