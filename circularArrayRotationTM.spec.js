import { expect } from "chai"
import circularArrayRotationTM from "./circularArrayRotationTM.js"

function testCircularArrayRotation(a, k, queries){
    return new Promise((resolve, reject) => {
        for (let j=0; j<k; j++){
            let x = a.pop()
            a.unshift(x)
        }
        var expectedResult = queries.map(val => a[val])
        resolve(expectedResult)
    })
}

describe("Circular Array Rotation Function Test", () => {
    describe("Positive Special Cases", () => {
        it("F001 - Non-empty array (a), non-empty query, and positive k", async () => {
            var result = await circularArrayRotationTM([1,2,3], 2, [1,2])
            expect(result).to.deep.equal([3, 1])
        }) 
        it("F002 - Non-empty array (a), non-empty query, and k is zero", async () => {
            var result = await circularArrayRotationTM([1,2,3], 0, [1,2])
            expect(result).to.deep.equal([2, 3])
        }) 
        it("F003 - Empty array (a), empty query, and positive k", async () => {
            var result = await circularArrayRotationTM([], 2, [])
            expect(result).to.deep.equal([])
        }) 
        it("F004 - Non-empty array (a), empty query, and positive k", async () => {
            var result = await circularArrayRotationTM([1,2,3], 2, [])
            expect(result).to.deep.equal([])
        })
        it("F005 - Non-empty array (a), non-empty query, and k greater than length of a", async () => {
            var result = await circularArrayRotationTM([1,2,3], 8, [1,2])
            expect(result).to.deep.equal([3, 1])
        }) 
    })
    describe("Negative Special Cases", () => {
        it("F006 - Empty array (a), non-empty query, and positive k", async () => {
            try{
                var result = await circularArrayRotationTM([], 2, [1,2])
            } catch (err) {
                var result = err
            }
            expect(result).to.equal("query must be less than length of a");
        })
        it("F007 - Non-empty array (a), non-empty query, and negative k", async () => {
            try{
                var result = await circularArrayRotationTM([1,2,3], -2, [])
            } catch (err) {
                var result = err
            }
            expect(result).to.equal("k must be non negative")
        })
        it("F008 - Non-empty query but the element value is greater than length of array a", async () => {
            try{
                var result = await circularArrayRotationTM([1,2,3], 2, [4])
            } catch (err) {
                var result = err
            }
            expect(result).to.equal("query must be less than length of a")
        })
        it("F009 - a and query is not array", async () => {
            try{
                var result = await circularArrayRotationTM("[1,2,3]", 2, 9)
            } catch (err) {
                var result = err
            }
            expect(result).to.equal("input type is not suitable")
        })
        it("F010 - k is not number", async () => {
            try{
                var result = await circularArrayRotationTM([1,2,3], "string", [1,2])
            } catch (err) {
                var result = err
            }
            expect(result).to.equal("input type is not suitable")
        })
        it("F011 - k is not integer", async () => {
            try{
                var result = await circularArrayRotationTM([1,2,3], 2.5, [1,2])
            } catch (err) {
                var result = err
            }
            expect(result).to.equal("k must be integer")
        })
    })
    describe("Performance Test", async () => {
        var totalTest = 2
        var aS = new Array(totalTest).fill(0).map((_, i) => new Array(10**5).fill(0).map(_ => 1 + Math.floor(Math.random() * 10**5)))
        var kS = new Array(totalTest).fill(0).map(_ => 1 + Math.floor(Math.random() * 10**5))
        var qS = new Array(totalTest).fill(0).map(_ => 1 + Math.floor(Math.random() * 500))
        var queryS = new Array(totalTest).fill(0).map((_, i) => new Array(qS[i]).fill(0).map(_ => Math.floor(Math.random() * 10**5)))
        for (let i=0; i<totalTest; i++){
            it(`F${(12+i).toString().padStart(3, "0")} - Perfomance test number ${1+i}`, async () => {
                var actualResult = await circularArrayRotationTM([...aS[i]], kS[i], queryS[i])
                var expectedResult = await testCircularArrayRotation([...aS[i]], kS[i], queryS[i])
                expect(actualResult).to.deep.equal(expectedResult)
            }).timeout(5000)
        }
    })
})