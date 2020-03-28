import "lodash.product";
import React from "react";
import _ from "lodash";

let possibilities = _.chain([
  ["no root", "root"],
  ["no 3rd", "b3", "n3"],
  ["no 5th", "b5", "#5"],
  ["no 7th", "b7", "n7"],
  ["no 9th", "b9", "n9", "#9"],
  ["no 11th", "n11", "#11"],
  ["no 13th", "b13", "n13"]
])
  .thru(a => _.product(...a))
  .size()
  .tap(console.log)
  .value();

const m = 3;
const M = 4;

const noteNames = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "C"
];

const templates = {
  [[m, m]]: "diminished",
  [[m, M]]: "minor",
  [[M, m]]: "major",
  [[M, M]]: "augmented"
};

const getName = notes => {
  return _.chain(notes)
    .map(root =>
      _.chain(notes)
        .map(note => (note - root < 0 ? 12 + note - root : note - root))
        .sort()
        .value()
    )
    .tap(console.log)
    .map(inversion => [
      inversion[1] - inversion[0],
      inversion[2] - inversion[1]
    ])
    .tap(console.log)
    .map((thirds, i) => ({
      note: noteNames[notes[i]],
      quality: templates[thirds]
    }))
    .reject(({ quality }) => _.isUndefined(quality))
    .tap(console.log)
    .value();
};

const App = () => {
  return <pre>{JSON.stringify(getName([4, 8, 1, 9]), null, 2)}</pre>;
};

export default App;
