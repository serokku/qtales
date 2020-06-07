all:
	rm -f ../build/qtales.html
	tweego . -o ../build/qtales.html

run:
	firefox ../build/qtales.html