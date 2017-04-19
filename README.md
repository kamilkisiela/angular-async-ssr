# angular-async-ssr
How to make an async operation to be SSR friendly (angular universal)

## Background

An Application bootstraps when it turns to be stable (`ApplicationRef.isStable`). 
It happens on few cases. One of them is when there's no pending MacroTasks (`NgZone.hasPendingMacrotasks`).

Let's say you do a basic async request, for example using **Fetch API**.
It's being scheduled as a MicroTask which means Angular treats it as something not important to wait for.

## Schedule MacroTask

A solution could be to schedule a MacroTask. Take a look at [an example implementation](./src/app/api.service.ts).
