import { Field, SmartContract, state, State, method, Poseidon } from 'snarkyjs';

export class Secret extends SmartContract {
  @state(Field) x = State<Field>();

  @method initState(salt: Field, firstSecret: Field) { 
    // values firstSecret and salt are secret, they can not be obeserved on chain.
    this.x.set(Poseidon.hash([salt, firstSecret]));
  }

  @method incrementSecret(salt: Field, secret: Field) {
    const x = this.x.get();
    this.x.assertEquals(x);

    Poseidon.hash([salt, secret]).assertEquals(x);
    // The Poseidon hash function takes in an array of Fields, and returns a single Field as output.
    this.x.set(Poseidon.hash([salt, secret.add(3)]));
  }
}