# This class represents a neural network object
# This class has been made following the tutorial in the book 'Make Your Own Neural Network' By Tariq Rashid
import numpy as np
import scipy.special


class NeuralNetwork:

    # Initialize the network
    def __init__(self, inp, hidn, outp, learningRate):
        # The activation function. scipy.special.expit(x) is the sigmoid
        self.activation_function = lambda x: scipy.special.expit(x)

        # Number of nodes in each of the input, hidden, and output layer
        self.inodes = inp
        self.hnodes = hidn
        self.onodes = outp

        self.lr = learningRate

        # Weights are of the form w_i_j, where the link is from node i to node j in the next layer
        # w11 w21
        # w12 w22  etc
        self.wih = np.random.normal(0.0, pow(self.hnodes, -0.5), (self.hnodes, self.inodes))
        self.who = np.random.normal(0.0, pow(self.onodes, -0.5), (self.onodes, self.hnodes))

    # train the neural network
    def train(self, inputs_list, targets_list):
        # convert input list to 2d array
        inputs = np.array(inputs_list, ndmin=2).T
        targets = np.array(targets_list, ndmin=2).T

        # calculate signals into hidden layer
        hidden_inputs = np.dot(self.wih, inputs)
        # calculate the signals emerging from hidden layer
        hidden_outputs = self.activation_function(hidden_inputs)
        # calculate the signals into the final output layer
        final_inputs = np.dot(self.who, hidden_outputs)
        # calculate the signals emerging from the final output layer
        final_outputs = self.activation_function(final_inputs)

        output_errors = targets - final_outputs

        # hidden layer error is the output_errors, split by weights, recombined at hidden nodes
        hidden_errors = np.dot(self.who.T, output_errors)

        # update the weights for the links between the hidden and output layers
        self.who += self.lr * np.dot((output_errors * final_outputs * (1.0 - final_outputs)), np.transpose(hidden_outputs))

        # update the weights for the links between the input and hidden layers
        self.wih += self.lr * np.dot((hidden_errors * hidden_outputs * (1.0 - hidden_outputs)), np.transpose(inputs))


    # Query the neural network
    def query(self, input_list):
        # convert input list to 2d array
        inputs = np.array(input_list, ndmin=2).T

        # calculate signals into hidden layer
        hidden_inputs = np.dot(self.wih, inputs)

        # calculate the signals emerging from hidden layer
        hidden_outputs = self.activation_function(hidden_inputs)

        # calculate the signals into the final output layer
        final_inputs = np.dot(self.who, hidden_outputs)

        # calculate the signals emerging from the final output layer
        final_outputs = self.activation_function(final_inputs)

        return final_outputs

