import unittest
import utils


class MyTestCase(unittest.TestCase):
    def test_broadcast(self):
        clock = utils.PlayerClock('Datchev', 1000, 0)
        clock.start()
        clock.broadcast()




if __name__ == '__main__':
    unittest.main()
