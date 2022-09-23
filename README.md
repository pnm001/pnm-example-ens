# Sample Project: ENS

## Invariant
The expiry time (lifespan) of a parent domain should always be longer than (or equal to) that of a child domain:

```
expiry(parent) >= expiry(child)
```

## Test File
[TestExpiry.t.sol](test/pnm/TestExpiry.t.sol)
