let input1 = `
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`

let input2 = `
../.. => .../#.#/...
#./.. => ..#/..#/#..
##/.. => .../#../..#
.#/#. => #../.../...
##/#. => #.#/.#./#..
##/## => ..#/#.#/..#
.../.../... => .#../#..#/#.../.#..
#../.../... => ..##/..##/.#.#/....
.#./.../... => ..##/..##/.###/##..
##./.../... => ..../.##./#.##/..#.
#.#/.../... => ####/#.##/#.##/#.#.
###/.../... => #..#/..#./..../##.#
.#./#../... => ..#./.#../...#/#.##
##./#../... => ..../#.##/#..#/.#..
..#/#../... => ##.#/####/###./###.
#.#/#../... => ..../#.##/.###/#.#.
.##/#../... => ..#./##.#/####/..##
###/#../... => ..#./.##./...#/..#.
.../.#./... => .###/#.../.#../####
#../.#./... => ###./.#.#/#.##/##.#
.#./.#./... => ..##/..#./###./..#.
##./.#./... => #..#/..#./###./...#
#.#/.#./... => #.../##.#/#.##/#..#
###/.#./... => ...#/#..#/####/##.#
.#./##./... => #.##/#.##/..../#.#.
##./##./... => ..##/###./..#./####
..#/##./... => ..../##../##.#/.##.
#.#/##./... => ##../####/####/.#.#
.##/##./... => ..../##.#/.###/##..
###/##./... => .#../#.#./.#../..##
.../#.#/... => ####/#.#./..##/#..#
#../#.#/... => .#../.#../#..#/....
.#./#.#/... => ..##/.##./####/#.#.
##./#.#/... => ..#./###./.#../....
#.#/#.#/... => ..#./..#./...#/#...
###/#.#/... => ###./.#../##../####
.../###/... => #.##/####/####/..##
#../###/... => .#.#/...#/###./...#
.#./###/... => ..../.#.#/.#../....
##./###/... => ...#/.###/..../.##.
#.#/###/... => ..##/###./.#../#..#
###/###/... => .###/..#./..#./.###
..#/.../#.. => .##./###./####/#.#.
#.#/.../#.. => ####/#.../#.../..##
.##/.../#.. => ###./#..#/..#./.#..
###/.../#.. => .###/.##./#.#./.###
.##/#../#.. => ##.#/...#/.#.#/...#
###/#../#.. => #.##/..#./..../#..#
..#/.#./#.. => #..#/##.#/.##./####
#.#/.#./#.. => ###./..##/#..#/#..#
.##/.#./#.. => .#../..../...#/...#
###/.#./#.. => .#../##../.###/..#.
.##/##./#.. => ##../..##/##../##.#
###/##./#.. => #.##/#..#/.###/####
#../..#/#.. => ##.#/####/#.../..##
.#./..#/#.. => #..#/..../..../###.
##./..#/#.. => #..#/##.#/##.#/#.#.
#.#/..#/#.. => .###/##.#/####/#...
.##/..#/#.. => ####/.##./...#/#..#
###/..#/#.. => .#.#/####/##.#/...#
#../#.#/#.. => ..##/.##./..##/##..
.#./#.#/#.. => #.../##../..##/..#.
##./#.#/#.. => ...#/##.#/#..#/.#..
..#/#.#/#.. => #.#./##../#.##/###.
#.#/#.#/#.. => ##../##.#/#.#./....
.##/#.#/#.. => ####/...#/####/.#..
###/#.#/#.. => ..../.#../.#../....
#../.##/#.. => .#.#/..#./#..#/.###
.#./.##/#.. => #.../.#.#/.###/.##.
##./.##/#.. => #.#./#.#./.#../###.
#.#/.##/#.. => ####/##../.##./####
.##/.##/#.. => #.../#.#./#.##/###.
###/.##/#.. => ####/####/..../####
#../###/#.. => ####/.##./...#/##.#
.#./###/#.. => .#../#.##/#..#/..##
##./###/#.. => #.#./..##/#.../..##
..#/###/#.. => #.##/.###/#.#./###.
#.#/###/#.. => #.##/#.##/..../#..#
.##/###/#.. => .##./#.#./..##/####
###/###/#.. => .##./#..#/#.../###.
.#./#.#/.#. => #.#./#..#/#..#/##.#
##./#.#/.#. => ...#/#.#./##.#/###.
#.#/#.#/.#. => ##.#/..##/##.#/#.##
###/#.#/.#. => .#.#/..#./##../.##.
.#./###/.#. => #..#/..#./..##/#...
##./###/.#. => ####/.#.#/####/..#.
#.#/###/.#. => #.#./..##/##../#..#
###/###/.#. => ...#/..../..../#.#.
#.#/..#/##. => ..#./.##./###./.#.#
###/..#/##. => #.../###./...#/####
.##/#.#/##. => ..../..../.###/##..
###/#.#/##. => ##../..../#.#./.##.
#.#/.##/##. => .#.#/##../..##/#.#.
###/.##/##. => ###./####/...#/.#..
.##/###/##. => ..##/#.../..##/.#.#
###/###/##. => ..##/...#/.###/.#..
#.#/.../#.# => ..##/#.../##.#/....
###/.../#.# => #.##/#..#/..../##..
###/#../#.# => #.../..../##.#/..#.
#.#/.#./#.# => ###./..##/.#../.##.
###/.#./#.# => ..../#..#/.###/#..#
###/##./#.# => .#.#/###./##.#/.###
#.#/#.#/#.# => ..../..../.##./#..#
###/#.#/#.# => .###/.#.#/...#/.###
#.#/###/#.# => .#.#/##../.#../.#..
###/###/#.# => .#.#/.##./#.##/....
###/#.#/### => ..#./..#./..#./..##
###/###/### => ##.#/..##/.#.#/....
`

const input3 = `
`;