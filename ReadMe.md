# Konjugate Hello World

A minimal [Konjugate](https://github.com/zenineasa/Konjugate) add-on -- the simplest possible example of the add-on API, meant as a starting point for anyone learning to author one. It contributes a single toolstrip button ("Hello") that opens a result-visualizer panel showing a static greeting; there is nothing else to it on purpose.

## Installing

Open Konjugate's Extensions dialog, switch to Discover, and install "Hello World" from there. See [docs/addonDevelopment.md](https://github.com/zenineasa/Konjugate/blob/main/docs/addonDevelopment.md) in the core repo for what the add-on API itself can do.

## Building from source

This repo builds against a sibling checkout of Konjugate core -- clone both side by side:

```
git clone https://github.com/zenineasa/Konjugate
git clone https://github.com/zenineasa/Konjugate-HelloWorld
cd Konjugate-HelloWorld
npm run build        # writes out/konjugate.helloWorld-<version>.kja
npm run install:dev  # also installs it into your local Konjugate's userData
```

`KONJUGATE_DIR` overrides the sibling-checkout assumption if you keep it elsewhere.

## License

[MPL-2.0](LICENSE), matching Konjugate core.
