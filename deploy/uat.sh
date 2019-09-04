#!/bin/bash

npm run build && pm2 start jonsnow.pm2.yaml --update-env