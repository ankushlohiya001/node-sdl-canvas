def primefactor(N) :
   #Enter your code here
   if N % 2 == 0:
      return 2
   i = 3
   while i ** 2 <= N:
      if N % i == 0:
         return i
      i += 2
   return N

def gcd(x, y):
   while y:
      x, y = y, x % y
   return x

def printM_SpecialGCD(N, M):
   pf = primefactor(N)
   ct = 0
   num = N + 1
   while True:
      num += 1
      if gcd(N, num) == pf:
         if ct < M:
             ct += 1
             print(num, end=" ")
         else:
             break

printM_SpecialGCD(10, 2)
