//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

type MaybeTag = 'Just' | 'Nothing';
type MaybePattern<A, R> = {
  Just(value: A): R,
  Nothing(): R
};


/**
 * A data structure that models the presence or absence of a value.
 * 
 * @author @robotlolita
 */
abstract class Maybe<A> {
  // --[ Type/Structure ]----------------------------------------------
  /** Makes this structure unique-ish */
  '@@folktale/maybe: contents type': A;

  /**
   * The internal tag of this union.
   * 
   * @stability experimental
   */
  abstract tag: MaybeTag;

  /**
   * Selects an operation depending on the tag of the union.
   * 
   * @stability experimental
   */
  abstract matchWith<R>(pattern: MaybePattern<A, R>): R;


  // --[ Variant constructors ]----------------------------------------
  /**
   * Constructs a Maybe with a value.
   * 
   * @stability stable
   */
  static Just<A>(value: A): Maybe<A> {
    return new Just(value);
  }

  /**
   * Constructs a Maybe without a value.
   * 
   * @stability stable
   */
  static Nothing<A>(): Maybe<A> {
    return new Nothing<A>();
  }


  // --[ Constructing ]------------------------------------------------
  /**
   * Constructs a Maybe with a value.
   * 
   * @stability stable
   */
  static of<A>(value: A): Maybe<A> {
    return new Just(value);
  }



  // --[ Transformations ]---------------------------------------------
  /**
   * Transforms the value inside of a Just.
   * 
   * @stability stable
   */
  map<B>(transformation: (value: A) => B): Maybe<B> {
    return this.matchWith({
      Just: (value) => new Just(transformation(value)),
      Nothing: () => new Nothing<B>()
    });
  }

  /**
   * Transforms one successful Maybe structure into another Maybe structure.
   * 
   * @stability stable
   */
  chain<B>(transformation: (value: A) => Maybe<B>): Maybe<B> {
    return this.matchWith({
      Just: (value) => transformation(value),
      Nothing: () => new Nothing<B>()
    });
  }

  /**
   * Applies the function inside of a Maybe to the value inside of another Maybe.
   * 
   * @stability stable
   */
  apply<A, B>(this: Maybe<(_: A) => B>, applicative: Maybe<A>): Maybe<B> {
    return this.chain(fn => applicative.map(fn));
  }


  // --[ Error recovering ]--------------------------------------------
  /**
   * Retrieves a value from a Maybe, or a fallback if one isn't available.
   * 
   * @stability stable
   */
  getOrElse(fallback: A): A {
    return this.matchWith({
      Just: (value) => value,
      Nothing: () => fallback
    });
  }

  /**
   * Transforms Maybes without a value into new Maybes.
   * 
   * @stability stable
   */
  orElse<A>(this: Maybe<A>, handler: () => Maybe<A>): Maybe<A> {
    return this.matchWith({
      Just: (value) => new Just(value),
      Nothing: () => handler()
    });
  }

  /**
   * Applies a function to each side of a Maybe.
   * 
   * @stability stable
   */
  fold<B>(onJust: (_: A) => B, onNothing: () => B): B {
    return this.matchWith({
      Just: (value) => onJust(value),
      Nothing: () => onNothing()
    });
  }
}



class Just<A> extends Maybe<A> {
  constructor(readonly value: A) {
    super();
  }

  tag: MaybeTag = 'Just';

  matchWith<R>(pattern: MaybePattern<A, R>): R {
    return pattern.Just(this.value);
  }
}


class Nothing<A> extends Maybe<A> {
  tag: MaybeTag = 'Nothing';

  matchWith<R>(pattern: MaybePattern<A, R>): R {
    return pattern.Nothing();
  }
}


export default Maybe;
