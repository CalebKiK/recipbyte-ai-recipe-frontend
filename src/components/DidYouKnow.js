"use client";

import { useState, useEffect } from "react";
import "../styles/HomePage.css";

const facts = [
  // 🥑 Food/Drink Facts
  "Honey never spoils — archaeologists found pots of it in ancient tombs, still preserved!",
  "Ketchup was once sold as medicine in the 1830s.",
  "Strawberries aren’t actually berries, but bananas are!",
  "An espresso has less caffeine than a cup of drip coffee.",
  "Potatoes were the first food grown in space.",
  "Chewing gum boosts concentration and memory — who knew?",
  "There are more than 10,000 varieties of tomatoes worldwide.",
  "Chocolate was once used as currency by the Aztecs.",
  "Apples float because 25% of their volume is air!",

  // 🌍 General Fun Facts
  "Octopuses have three hearts and blue blood!",
  "Your heartbeat changes rhythm to match the music you're listening to.",
  "Sloths can hold their breath longer than dolphins — up to 40 minutes!",
  "A day on Venus is longer than a year on Venus.",
  "Sharks existed before trees were even a thing.",
  "Wombat poop is cube-shaped — yes, really.",
  "Bananas are radioactive (but safe to eat).",
  "There's enough DNA in your body to stretch from Earth to Pluto... and back.",
  "The Eiffel Tower can grow over 6 inches taller in summer due to heat expansion.",
  "A bolt of lightning is five times hotter than the sun’s surface.",
  "You can't hum while holding your nose — try it!",
  "There’s a species of jellyfish that can technically live forever.",
  "Humans share 60% of their DNA with bananas.",
  "The longest hiccuping spree lasted 68 years.",
  "Butterflies can taste with their feet.",
  "Every “C” in Pacific Ocean is pronounced differently.",

  "Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
  "Bananas are berries, but strawberries aren't.",
  "Chocolate was once used as currency.",
  "A group of flamingos is called a flamboyance.",
  "The Eiffel Tower can be 15 cm taller during summer due to thermal expansion.",
  "Octopuses have three hearts.",
  "The Great Wall of China is not visible from space with the naked eye.",
  "Cleopatra lived closer in time to the moon landing than to the building of the Great Pyramid of Giza.",
  "The average person walks the equivalent of five times around the world in their lifetime.",
  "A day on Venus is longer than a year on Venus.",
  "Ketchup was sold in the 1830s as medicine.",
  "The human nose can detect over 1 trillion scents.",
  "There are more trees on Earth than stars in the Milky Way.",
  "The first computer mouse was made of wood.",
  "The world's oldest known recipe is for beer.",
  "A blue whale's heart is so large, a human can swim through its arteries.",
  "The inventor of the Pringles can was buried in one.",
  "Lightning strikes the Earth about 100 times per second.",
  "The sound of a whip cracking is a mini sonic boom.",
  "Avocados are technically berries.",
  "The Sahara Desert was once a tropical rainforest.",
  "The word 'algorithm' comes from the name of a Persian mathematician, Al-Khwarizmi.",
  "Cows have best friends and get stressed when separated.",
  "Pineapples take nearly 3 years to grow.",
  "The 'S' in Harry S. Truman didn't stand for anything."
];

export default function DidYouKnow() {
  const [fact, setFact] = useState("");

  useEffect(() => {
    // Pick a random fact initially
    setFact(facts[Math.floor(Math.random() * facts.length)]);

    const interval = setInterval(() => {
      setFact((prevFact) => {
        let newFact;
        do {
          newFact = facts[Math.floor(Math.random() * facts.length)];
        } while (newFact === prevFact); // Ensure it's different
        return newFact;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="did-you-know-component">
      <h2>Did You Know?</h2>
      <p>{fact}</p>
    </div>
  );
}
