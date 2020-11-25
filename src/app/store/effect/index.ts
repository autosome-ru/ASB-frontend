import {SearchEffect} from "src/app/store/effect/search.effect";
import {DataEffect} from "src/app/store/effect/data.effect";
import {ReleaseEffect} from "./release.effect";
import {AnnotationEffect} from "./annotation.effect";

export const asbAppEffects = [
    SearchEffect,
    DataEffect,
    ReleaseEffect,
    AnnotationEffect
];
