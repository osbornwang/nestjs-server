#!/bin/bash

npm run build && pm2 start jonsnow.pm2.yaml --env production --update-env