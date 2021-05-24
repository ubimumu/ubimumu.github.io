# anticaptcha setup
Here's how to setup AntiCaptcha with Lilypad.

## selfhosted (non-heroku)
All you must do to setup AntiCaptcha for Lilypad is create a file in the root of the Lilypad folder called "config.json".

In that file, in JSON formatting, make a variable titled "key".

```json
{
    "key": "[anticaptcha key here]"
}
```

Restart Lilypad if it is running and you're good to go!

## heroku instances
Go to the Lilypad instance's settings and click on "Reveal Config Vars".

![The page with a mouse hovering over the button](https://i.imgur.com/NMNsFHD.png)

Then, enter in the KEY field "ACKEY" exactly how it's displayed here, and in the VALUE field, enter your AntiCaptcha key and click "Add".

![Example of how it should look](https://i.imgur.com/aPgbQsZ.png)

After doing this, redeploy the instance and verify that it is up to date.